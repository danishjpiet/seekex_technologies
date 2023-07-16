const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Bucket = sequelize.define('buckets', {
    id : {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull:false
    },
    bucketName: {
        type : DataTypes.STRING,
        allowNull:false
    },
    bucketVolume:{
        type:DataTypes.FLOAT,
        allowNull:false,
    }
});

Bucket.sync({force:false})

module.exports = Bucket;