var express = require('express');
var router = express.Router();

var total = [];

router.post('/', function (req, res) {
  total = [];
if (req.body.type === 'add'){
  total.push(Number(req.body.x) + Number(req.body.y));
}
if (req.body.type === 'subtract'){
  total.push(Number(req.body.x) - Number(req.body.y));
}
if (req.body.type === 'multiply'){
  total.push(Number(req.body.x) * Number(req.body.y));
}
if (req.body.type === 'divide'){
  total.push(Number(req.body.x) / Number(req.body.y));
}


  res.sendStatus(200);
});

router.get('/', function (req, res) {

  res.send(total);
});







module.exports = router;
