const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('Admin', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Question = sequelize.define('Question', {
    questionText: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('open-ended', 'likert', 'closed-ended'),
        allowNull: false,
    },
    options: {
        type: DataTypes.JSON,
        allowNull: true,
    },

});

const Response = sequelize.define('Response', {
    answerText: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});



Admin.hasMany(Question, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Question.belongsTo(Admin);

Question.hasMany(Response, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Response.belongsTo(Question);

async function syncModels() {
    try {
        await sequelize.sync({  alter: true });
        console.log('Models synchronized');
    } catch (err) {
        console.error('Error synchronizing models', err);
    }
}

syncModels().then();

module.exports = {Admin, Question, Response};
