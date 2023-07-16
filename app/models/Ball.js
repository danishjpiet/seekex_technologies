const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const BallsInBucket = require("./BallsInBucket");

const Ball = sequelize.define("balls", {
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
  ballVolume: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Ball.hasOne(BallsInBucket, { sourceKey: "ballName", foreignKey: "ballName" });

Ball.sync({ force: false });

module.exports = Ball;
