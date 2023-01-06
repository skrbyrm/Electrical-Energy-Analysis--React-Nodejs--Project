import Sequelize from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const Hourly = db.define(
  "data_by_hours",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    facility: {
      type: Sequelize.TEXT,
    },
    district: {
      type: Sequelize.TEXT,
    },
    date: {
      type: Sequelize.DATE,
    },
    active: {
      type: Sequelize.DOUBLE,
    },
    capacitive: {
      type: Sequelize.DOUBLE,
    },
    inductive: {
      type: Sequelize.DOUBLE,
    },
    ssno: {
      type: Sequelize.BIGINT,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    active_cons: {
      type: Sequelize.DOUBLE,
    },
    inductive_cons: {
      type: Sequelize.DOUBLE,
    },
    capacitive_cons: {
      type: Sequelize.DOUBLE,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: true,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Hourly);
Hourly.belongsTo(Users, { foreignKey: "userId" });

export default Hourly;
