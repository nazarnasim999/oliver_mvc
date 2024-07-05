// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../../config/database');

// // Import models
// const Job = require('./Job')(sequelize, DataTypes);
// const AppliedJob = require('./AppliedJob')(sequelize, DataTypes);

// // Define associations
// Job.hasMany(AppliedJob, { foreignKey: 'job_id' });
// AppliedJob.belongsTo(Job, { foreignKey: 'job_id' });

// // Synchronize models with the database
// sequelize.sync({ alter: true })
//     .then(() => {
//         console.log('Database synchronized');
//     })
//     .catch((err) => {
//         console.error('Error synchronizing database:', err);
//     });

// module.exports = {
//     Job,
//     AppliedJob,
//     sequelize
// };
