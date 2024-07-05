const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


const AppliedJob = sequelize.define('AppliedJob', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    job_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
       
    },


    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
        
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        
    },

    phonenumber: {
        type: DataTypes.STRING,
        allowNull: true,
      
    },


}, {
    timestamps: true
});



// AppliedJob.belongsTo(Job, { foreignKey: 'job_id' , as: 'JobsDetails' });


// Jobs.hasMany(AppliedJob, {
//     foreignKey: 'job_id'
//   });
  
//   AppliedJob.belongsTo(Jobs, {
//     foreignKey: 'job_id'
//   });


// AppliedJob.associate = function(models) {
//     AppliedJob.belongsTo(models.Job, { foreignKey: 'job_id' });
// };


module.exports = AppliedJob;
