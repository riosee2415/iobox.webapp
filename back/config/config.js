const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "dev",
    password: process.env.DB_PASSWORD,
    database: "iobox",
    host: process.env.DB_DEV_PORT,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "iobox",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "iobox",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
