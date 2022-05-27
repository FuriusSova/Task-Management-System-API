require('dotenv').config();
const sequelize = require("./db/configuration")
const PORT = process.env.PORT || 3000;
const express = require('express');
const cookieParser = require('cookie-parser');

const authRouter = require("./routes/authRouter"),
    taskRouter = require("./routes/taskRouter");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/task', taskRouter);

app.listen(PORT, async () => {
    console.log("Connection established");

    // Connection to database
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (error) {
        throw error;
    }
})