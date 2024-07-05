const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Chat = sequelize.define('Chat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Sender_Id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Reciever_Id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Chat;
