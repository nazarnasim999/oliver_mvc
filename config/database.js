const { Sequelize } = require('sequelize');
// const { Job, AppliedJob } = require('../app/models');



const sequelize = new Sequelize('mvc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});



module.exports = sequelize;
