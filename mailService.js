const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

exports.sendEmail = async (code, email) => {
    let mailOptions = {
        from: "denis.sova.2004@gmail.com",
        to: email,
        subject: "Registration confirmation",
        text: `Your confirmation code: ${code}`
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if(err) return false;
        return true;
    })
}