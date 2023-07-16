const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Result = sequelize.define("results", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  resultData: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Result.sync({ force: false });

module.exports = Result;
