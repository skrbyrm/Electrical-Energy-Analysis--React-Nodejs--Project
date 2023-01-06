import { Sequelize } from "sequelize";
import config from "../config.js";

let db;

try {
  db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    port: config.db.port,
    host: config.db.host,
    dialect: "mysql",
  });
} catch (error) {
  console.error("Error connecting to the database:", error);
}

export default db;
