const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mvc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
