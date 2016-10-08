var express = require('express');
var router = express.Router();

var total = [];
//takes in the data sent from client.js and does the calcuation 
router.post('/', function (req, res) {
  //clears previous total
  total = [];
  //depending on the type, it does the appriopriate calculation
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
//send the total info back to server.js which will send it to the client side
  res.send(total);
});

module.exports = router;
