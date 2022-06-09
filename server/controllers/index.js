var pool = require('../db');

module.exports = {

  getQuestions: function(req, res) {
    console.log('req.param.product_id',req.query.product_id )
    let queryStr = `select id, question_body, question_date, asker_name, question_helpfulness, reported from questions where product_id = ${req.query.product_id};`
    pool.query(queryStr)
    .then((data) => {
      let result = {
        "product_id": req.query.product_id,
        "results": data.rows
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send('could not access data')
    })
  }
}
