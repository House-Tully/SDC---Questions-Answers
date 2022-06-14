var controller = require('./controllers');
var router = require('express').Router();
require('dotenv').config()

// https://expressjs.com/en/starter/basic-routing.html
// app.METHOD(PATH, HANDLER)
router.get('/questions', controller.getQuestions);

router.get('/questions/:question_id/answers', controller.getAnswerList);

router.post('/questions', controller.postQuestion);

router.post('/questions/:question_id/answers', controller.postAnswer)

router.put('/questions/:question_id/helpful', controller.updateQHelpfulness);

router.put('/questions/:question_id/report', controller.updateQReport);

router.put('/answers/:answer_id/helpful', controller.updateAHelpfulness)

router.put('/answers/:answer_id/report', controller.updateAReport);


module.exports = router;