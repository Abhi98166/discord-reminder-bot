const sequelize = require('./db')
const DataTypes = require('sequelize');


const Reminder = sequelize.define('Reminder', {
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    channelId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Reminder;