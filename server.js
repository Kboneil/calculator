var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var calcRouter = require('./routes/calculate');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/calculate', calcRouter);
console.log('/calculate', calcRouter);
app.use(function(req, res, next){
  next();
})

app.get('/', function (req, res) {
  var file = path.join(__dirname, 'public/views/index.html');
  res.sendFile(file);
});

app.listen(3000);
