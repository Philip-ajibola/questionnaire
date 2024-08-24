const { Admin,Question,Response } = require('../models/models');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        let admin = await Admin.findOne({ where: { username } });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        admin = await Admin.create({
            username,
            password: hashedPassword,
        });
        const createAdminResponse = {
            id: admin.id,
            username: admin.username,
        };
        res.status(201).json({  createAdminResponse });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createQuestion = async (req, res) => {
    const { questionText, type, options, adminId} = req.body;

    try {
        const newQuestion = await Question.create({
            questionText,
            type,
            options: options || null,
            AdminId: adminId,
        });

        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create question' });
    }
};

exports.editQuestion = async (req, res) => {
    const { questionText, type, options } = req.body;
    const { id } = req.params;

    try {
        const question = await Question.findByPk(id);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        question.questionText = questionText || question.questionText;
        question.type = type || question.type;
        question.options = options || question.options;

        await question.save();
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update question' });
    }
};
exports.getAllAnswersForQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const answers = await Response.findAll({ where: { QuestionId: id } });
        if (answers.length > 0) {
            res.status(200).json(answers);
        } else {
            res.status(404).json({ message: 'No answers found for this question' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve answers' });
    }
};


exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Question.destroy({ where: { id } });
        if (result) {
            res.status(204).send("Question Deleted");
        } else {
            res.status(404).json({ error: 'Question not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete question' });
    }
};

