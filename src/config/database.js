const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('questionnaire_db', 'root', 'Bobbyjay1@2&3', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Error connecting to database', err));

module.exports = sequelize;
