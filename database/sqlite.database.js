const { Sequelize } = require("sequelize");
const basePath = process.cwd();
const sequelize = new Sequelize("database", "chicken", "spining8975*", {
  dialect: "sqlite",
  host: `${basePath}/database/database.sqlite`,
  logging: false,
});

module.exports = sequelize;
