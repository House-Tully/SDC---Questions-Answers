var express = require('express');
require('dotenv').config()

// Router
var router = require('./routes.js');

var app = express();

// Set what we are listening on.
app.set('port', 3000);

app.use(express.json());

// Set up our routes
app.use('/qa', router);

app.get(`/${process.env.LOADER}`, (req, res) => {
  res.send(`${process.env.LOADER}`)
})


// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}