const express = require('express');
const router = express.Router();
const Task = require("../models/task");
const tokenService = require("../tokenService");

// Creating task
router.post('/createTask', async (req, res, next) => {
    if (req.cookies.JWToken) {
        const token = req.cookies.JWToken;
        const data = tokenService.validateToken(token);
        if (data.message == "jwt expired") {
            res.json({ message: "Token has been expired, please login again" })
            return;
        }
    } else {
        res.json({ message: "You should log in" })
        return;
    }

    const date = (new Date(req.body.date)).toISOString();
    const task = await Task.create({ title: req.body.title, description: req.body.description, priority: req.body.priority, dueDate: date });

    res.statusCode = 200;
    res.json({ message: "Task has been created" })
});

// Marking task as done
router.get('/done', async (req, res, next) => {
    const task = await Task.findOne({ where: { title: req.body.title } });
    if (task) {
        task.isDone = true;
        await task.save();
        res.statusCode = 200;
        res.json({ message: "isDone has been updated to true" });
    } else {
        res.statusCode = 404;
        res.json({ message: "Task not found" });
    }
});

// Unmarking task as done
router.get("/notDone", async (req, res) => {
    const task = await Task.findOne({ where: { title: req.body.title } });
    if (task) {
        task.isDone = false;
        await task.save();
        res.statusCode = 200;
        res.json({ message: "isDone has been updated to false" });
    } else {
        res.statusCode = 404;
        res.json({ message: "Task not found" });
    }
})

// Editing task
router.put('/editTask', async (req, res, next) => {
    const task = await Task.findOne({ where: { title: req.body.title } });
    if (task) {
        if (req.body.updateTitle) task.title = req.body.updateTitle;
        if (req.body.updateDescription) task.description = req.body.updateDescription;
        if (req.body.updatePriority) task.description = req.body.updatePriority;
        if (req.body.updateDueDate) task.description = req.body.updateDueDate;
        await task.save();
        res.statusCode = 200;
        res.json({ message: "Task has been updated" });
    } else {
        res.statusCode = 404;
        res.json({ message: "Task not found" });
    }
});

// Deleting task
router.delete('/deleteTask', async (req, res, next) => {
    const task = await Task.destroy({ where: { title: req.body.title } });
    res.statusCode = 200;
    res.json({ message: "Task has been deleted" });
});

module.exports = router;