
const {Question,Response} = require("../models/models");

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.findAll();

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving questions', error });
    }
};
exports.submitAnswer = async (req, res) => {
    const { answerText, questionId } = req.body;

    try {
        const newAnswer = await Response.create({
            answerText,
            QuestionId: questionId
        });

        res.status(201).json(newAnswer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit answer' });
    }
};

