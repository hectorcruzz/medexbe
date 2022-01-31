var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.status(200).json({'version':'1.0', 'application':'medex backend'});
});

module.exports = router;

