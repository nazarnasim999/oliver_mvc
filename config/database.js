const { Sequelize } = require('sequelize');
// const { Job, AppliedJob } = require('../app/models');



const sequelize = new Sequelize('u976218528_mvc', 'u976218528_mvc', 'Explore999', {
    host: 'srv1140.hstgr.io',
    dialect: 'mysql',
    // logging: false
});



// const sequelize = new Sequelize('mvc', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     // logging: false
// });




module.exports = sequelize;
