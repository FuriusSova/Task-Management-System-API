const { Sequelize } = require("sequelize");

module.exports = new Sequelize(`${process.env.DATABASE_URL}?sslmode=no-verify`, {timezone: "+01:00"});