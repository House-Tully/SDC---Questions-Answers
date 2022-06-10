var controller = require('./controllers');
var router = require('express').Router();

// https://expressjs.com/en/starter/basic-routing.html
// app.METHOD(PATH, HANDLER)
router.get('/questions', controller.getQuestions);

router.get('/questions/:question_id/answers', controller.getAnswerList);

router.post('/questions', controller.postQuestion);

router.post('/questions/:question_id/answers', controller.postAnswer)

router.put('/questions/:question_id/helpful');

router.put('/questions/:question_id/report');

router.put('/answers/:answer_id/helpful')

router.put('/answers/:answers_id/report');

module.exports = router;