var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.json('respond with a resource');
});

router.get('/restid/:id', function(req, res, next) {
  
  res.json(req.params.id);
});
module.exports = router;
