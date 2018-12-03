var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});

router.get('/whack', function(req, res, next) {
  res.render('whack.html', { title: 'Express' });
});

router.get('/whackm', function(req, res, next) {
  res.render('whackm.html', { title: 'Express' });
});

router.get('/drum', function(req, res, next) {
  res.render('drum.html');
});

router.get('/slider', function(req, res, next) {
  res.render('slider.html', { title: 'Express' });
});

router.get('/vr', function(req, res, next) {
  res.render('vr.html');
});

router.get('/game', function(req, res, next) {
  res.render('index.ejs', { title: 'Express' });
});

router.get('/slot', function(req, res, next) {
  res.render('slot.html', { title: 'Express' });
});

router.get('/wifisetup', function(req, res, next) {
  res.render('wifisetup.html', { title: 'Express' });
});

router.get('/sound', function(req, res, next) {
  res.render('sound.html', { title: 'Express' });
});

router.get('/painting', function (req, res) {
    res.render('index',{});
});

module.exports = router;
