require("dotenv").config();
const { Sequelize } = require("sequelize");
const { postgres_db, postgres_user, postgres_pwd, postgres_port, production } =
  process.env;

const sequelize = new Sequelize(postgres_db, postgres_user, postgres_pwd, {
  host: production == "PROD" ? "host.docker.internal" : "localhost",
  port: 5434,
  dialect: "postgres",
  logging: false,
});

sequelize.authenticate().then(() => console.log("PSQL: Authorized!"));
sequelize.sync().then(() => console.log("PSQL: Database was synced!"));

module.exports = sequelize;
