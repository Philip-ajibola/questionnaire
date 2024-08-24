const express = require('express');
const { submitAnswer,getAllQuestions } = require('../controller/userController');
const router = express.Router();

router.post('/answers', submitAnswer);
router.post('/findAll', getAllQuestions);

module.exports = router;
