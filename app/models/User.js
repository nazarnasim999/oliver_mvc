const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false,
      
    },


    password: {
        type: DataTypes.STRING,
        allowNull: false,
    
    },


    firstname: {
        type: DataTypes.STRING,
        allowNull: true,
    
    },

    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    
    },

    mobile: {
        type: DataTypes.STRING,
        allowNull: true,
    
    },


    address: {
        type: DataTypes.STRING,
        allowNull: true,
    
    },


    city: {
        type: DataTypes.STRING,
        allowNull: true,
    
    },


    country: {
        type: DataTypes.STRING,
        allowNull: true,
    
    },


    
    about: {
        type: DataTypes.STRING,
        allowNull: true,
    
    },


     
    experience: {
        type: DataTypes.STRING,
        allowNull: true,
    
    },

     
    qualification: {
        type: DataTypes.STRING,
        allowNull: true,
    
    },

}, {
    timestamps: true
});

module.exports = User;
