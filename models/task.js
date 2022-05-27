const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/configuration");

class Task extends Model { }

Task.init({
    title: { type: DataTypes.STRING, allowNull : false },
    description: { type: DataTypes.STRING, allowNull : false },
    isDone: { type: DataTypes.BOOLEAN, defaultValue : false },
    priority: { type: DataTypes.INTEGER, allowNull : false },
    dueDate: { type: DataTypes.DATE, allowNull : false }
}, { sequelize, modelName: 'task', timestamps: false });

module.exports = Task;