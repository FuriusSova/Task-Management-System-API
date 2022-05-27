const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const createCode = require("../createCode");
const tokenService = require("../tokenService");
const mailService = require("../mailService");

// Sign in
router.post('/signin', async (req, res, next) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && user.confirmedAt) {
        const isPassCorrect = await bcrypt.compare(req.body.password, user.password);
        if (isPassCorrect) {
            const token = tokenService.generateToken({ username: user.username });
            res.cookie("JWToken", token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
            res.statusCode = 200;
            res.json({ message: "Login success" })
        } else {
            res.statusCode = 403;
            res.json({ message: "You entered an invalid email or password. Please try again.", credentials: true })
        }
    } else if (user && !user.confirmedAt) {
        res.statusCode = 403;
        res.json({ message: "You didn't confirm you email" });
    } else {
        res.statusCode = 404;
        res.json({ message: "User not found" });
    }
});

// Sign up
router.post('/signup', async (req, res, next) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
        if (!user.confirmedAt) {
            res.statusCode = 304;
            res.json({ message: "Confirm your email" });
        } else {
            res.statusCode = 401;
            res.json({ message: "User is already exists" });
        };
    } else {
        if (req.body.password.length < 6) {
            res.json({ message: "Password should contain at least 6 characters" });
        } else {
            const hashPassword = await bcrypt.hash(req.body.password, 3);
            const code = createCode.generateCode();
            mailService.sendEmail(code, req.body.email);

            await User.create({ username: req.body.username, email: req.body.email, password: hashPassword, code: code });
            res.statusCode = 200;
            res.json({ message: "The confirmation code has been sent" })
        }
    }
});

// Sign out
router.get("/signout", async (req, res) => {
    res.clearCookie("JWToken");
    res.end();
})

// Confirmation
router.put('/confirm', async (req, res, next) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
        if (user.code == req.body.confirmCode) {
            await User.update({ confirmedAt: new Date(Date.now()).toISOString() }, { where: { username: req.body.username } });
            res.statusCode = 200;
            res.json({ message: "Confirmation has been succesfully complited" });
        } else {
            res.statusCode = 401;
            res.json({ message: "Invalid code" })
        }
    } else {
        res.statusCode = 404;
        res.json({ message: "User not found" });
    }
});

module.exports = router;