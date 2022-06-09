var controller = require('./controllers');
var router = require('express').Router();

// https://expressjs.com/en/starter/basic-routing.html
// app.METHOD(PATH, HANDLER)
router.get('/questions', controller.getQuestions);

router.get('/questions/:question_id/answers');

router.post('/questions');

router.post('/questions/:question_id/answers')

router.put('/questions/:question_id/helpful');

router.put('/questions/:question_id/report');

router.put('/answers/:answer_id/helpful')

router.put('/answers/:answers_id/report');

module.exports = router;