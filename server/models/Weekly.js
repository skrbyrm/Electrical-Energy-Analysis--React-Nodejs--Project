import Sequelize from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const Weeksly = db.define(
  "data_by_weeks",
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
    inductive_ratio: {
      type: Sequelize.DOUBLE,
    },
    capacitive_ratio: {
      type: Sequelize.DOUBLE,
    },
    penalized: {
      type: Sequelize.BOOLEAN,
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

Users.hasMany(Weeksly);
Weeksly.belongsTo(Users, { foreignKey: "userId" });

export default Weeksly;
