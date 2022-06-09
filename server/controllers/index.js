var pool = require('../db');

module.exports = {

  getQuestions: function(req, res) {
    console.log('req.param.product_id',req.query.product_id )
    let queryStr = `select id, question_body, question_date, asker_name, question_helpfulness, reported,
    (select json_object_agg(
      answers.id, json_build_object(
        'id', id,
        'answer_body',answer_body,
        'photos',(select json_agg(
          json_build_object(
            'id', id,
            'url', pic_url))
            as photos from photos
            where answer_id=answers.id)))
            as answers from answers
            where question_id=questions.id)
            from questions where product_id = $1;`
    pool.query(queryStr,[req.query.product_id])
    .then((data) => {
      let result = {
        "product_id": req.query.product_id,
        "results": data.rows
      }
      // let queryStr = ``
      // pool.query(queryStr)
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log('error', err);
      res.status(500).send(err)
    })
  }
}
