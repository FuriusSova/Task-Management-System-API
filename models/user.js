const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/configuration");

class User extends Model { }

User.init({
    username: { type: DataTypes.STRING, unique : true, allowNull : false },
    email: { type: DataTypes.STRING, unique: true, allowNull : false  },
    password: { type: DataTypes.STRING },
    confirmedAt : { type: DataTypes.DATE, defaultValue: null },
    code: { type: DataTypes.INTEGER }
}, { sequelize, modelName: 'user', timestamps: false });

module.exports = User;