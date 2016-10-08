var express = require('express');
var router = express.Router();

var total = [];
//takes in the data sent from client.js and does the calcuation
//that matchs its URL 
router.post('/add', function (req, res) {
    total = [];
  total.push(Number(req.body.x) + Number(req.body.y));
  res.sendStatus(200);
});

router.post('/subtract', function (req, res) {
    total = [];
  total.push(Number(req.body.x) - Number(req.body.y));
  res.sendStatus(200);
});
router.post('/divide', function (req, res) {
    total = [];
  total.push(Number(req.body.x) / Number(req.body.y));
  res.sendStatus(200);
});
router.post('/multiply', function (req, res) {
    total = [];
  total.push(Number(req.body.x) * Number(req.body.y));
  res.sendStatus(200);
});


router.get('/', function (req, res) {
//send the total info back to server.js which will send it to the client side
  res.send(total);
});

module.exports = router;
