const { Sequelize } = require("sequelize");

module.exports = new Sequelize(`${process.env.POSTGRES_URI}?sslmode=no-verify`, {timezone: "+01:00"});