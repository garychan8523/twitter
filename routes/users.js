'use strict';

var express = require('express');
var router = express.Router();

var Tweet = require('../lib/tweet');

router.get('/', function(req, res, next) {
  if (!res.locals.user) {
    console.log('Cannot retrieve users info');
    return res.redirect('/');
  }

  Tweet.filter(function filterByUsername(tweet) {
    if (!tweet.user) {
      return false;
    }
    return tweet.user.id === res.locals.user.id;
  }, function(err, tweets) {
    if (err) {
      return next(err);
    }
    if (req.remoteUser) {
      return res.json(tweets);
    }
    res.render('users', {
      title: 'Users',
      tweets: tweets,
      count: tweets.length
    });
  });
});

module.exports = router;