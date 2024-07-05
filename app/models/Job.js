const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const AppliedJob = require('./AppliedJob');

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        
    },

    location: {
        type: DataTypes.STRING,
        allowNull: true,
      
    },


    type: {
        type: DataTypes.STRING,
        allowNull: true,
    
    },


    budget: {
        type: DataTypes.INTEGER,
        allowNull: true,
    
    },


    instructor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    
    },


}, {
    timestamps: true
});

// Job.has(AppliedJob, { foreignKey: 'job_id' });




module.exports = Job;
