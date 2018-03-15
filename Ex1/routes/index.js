var express = require('express');
var router = express.Router();
const API_KEY = "AIzaSyAFYSDvfCmuGEMDedlezPhmC65k3eS1ky0";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ex1', (req,res) => {
  return res.sendfile('./public/index.html')
});

module.exports = router;
