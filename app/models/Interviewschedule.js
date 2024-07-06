const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


const Interviewschedule = sequelize.define('Interviewschedule', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    job_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
       
    },


    date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    time: {
        type: DataTypes.STRING,
        allowNull: true,
        
    },

  

}, {
    timestamps: true
});





module.exports = Interviewschedule;
