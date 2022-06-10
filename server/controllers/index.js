var pool = require('../db');

module.exports = {

  getQuestions: function(req, res) {
    console.log('req.param.product_id',req.query.product_id )
    let queryStr = `select question_id, question_body, question_date, asker_name, question_helpfulness, reported,
    (select json_object_agg(
      answers.id, json_build_object(
        'id', id,
        'body',answer_body,
        'date', answer_date,
        'answerer_name', answerer_name,
        'helpfulness', question_helpfulness,
        'photos',(select json_agg(
          json_build_object(
            'id', id,
            'url', pic_url))
            as photos from photos
            where answer_id=answers.id)))
            as answers from answers
            where question_id=questions.question_id)
            from questions where product_id = $1;`
    pool.query(queryStr,[req.query.product_id])
    .then((data) => {
      let result = {
        "product_id": req.query.product_id,
        "results": data.rows
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log('error', err);
      res.status(500).send(err)
    })
  },

  getAnswerList: function(req, res) {
    console.log(req.params.question_id);
    console.log(req.query.page, req.query.count)

    let queryStr = `(select id as answers_id, answer_body as body, answer_date as date, answerer_name, question_helpfulness as helpfulness,(select json_agg(
          json_build_object(
            'id', id,
            'url', pic_url))
            as photos from photos
            where answer_id=answers.id ) from answers
            where question_id=$1)`;
    pool.query(queryStr, [req.params.question_id])
    .then( (data) => {
      let result = {
        "question": req.params.question_id,
        "page": req.query.page,
        "count": req.query.count,
        "results": data.rows
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
  },

  postQuestion: function(req,res) {
    // console.log(req.body);
    let date = JSON.stringify(new Date());
    console.log('typeof', date)
    let queryStr = `insert into questions (product_id, question_body, question_date, asker_name, email, reported, question_helpfulness) values ($1, $2, $3, $4, $5, 0, 0)`
    pool.query(queryStr, [req.body.product_id, req.body.body, date, req.body.name, req.body.email])
    .then((result) => {
      res.status(201).send('CREATED');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('could not post question')
    })
  },

  postAnswer: function(req,res) {
    let date = JSON.stringify(new Date());

    let queryStr = `
    with answerID as (
      insert into answers ( question_id, answer_body, answer_date, answerer_name, answerer_email, reported, question_helpfulness)
      values ($1, $2, $3, $4, $5, false, 0)
      returning id
      )
      insert into photos (answer_id, pic_url)
      select id, $6
      from answerID;`

    pool.query(queryStr, [req.params.question_id, req.body.body, date, req.body.name, req.body.email, req.body.photos[0]])
    .then((result) => {
      res.status(201).send('CREATED');
    })
    .catch((err) => {
      res.status(500).send('could not post question')
    })


  }
}
