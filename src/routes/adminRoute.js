const express = require('express');
const { createQuestion, editQuestion, deleteQuestion,register,getAllAnswersForQuestion } = require('../controller/adminController')
const adminRouter = express.Router();

adminRouter.post('/admin/questions', createQuestion);
adminRouter.post('/admin/register', register);
adminRouter.get('/admin/findAllAnswers/:id', getAllAnswersForQuestion);
adminRouter.put('/admin/edit/:id', editQuestion);
adminRouter.delete('/admin/delete/:id', deleteQuestion);


module.exports = adminRouter;
