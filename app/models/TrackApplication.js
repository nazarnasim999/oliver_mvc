const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const TrackApplication = sequelize.define('TrackApplication', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,

    applied: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0,
    },
    rejected: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0,
      
    },

    completed: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0,
      
    },


    shortlisted: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0,
    
    }


   

     


     
 


  

  

}, {
    timestamps: true
});

module.exports = TrackApplication;
