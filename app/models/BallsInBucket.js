const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BallsInBucket = sequelize.define("balls_in_buckets", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  ballName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ballCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

BallsInBucket.sync({ force: false });

module.exports = BallsInBucket;
