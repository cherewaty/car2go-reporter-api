require('dotenv').config();

var express = require('express');
var proxy = require('express-http-proxy');

var app = express();

app.listen(3000, function () {
  console.log('car2go Reporter API listening on port 3000');
});

app.use('/proxy/car2go', proxy('www.car2go.com', {
  https: true,
  proxyReqPathResolver: function(req) {
    return require('url').parse(req.url).path + '&oauth_consumer_key=' + process.env.CAR2GO_OAUTH_CONSUMER_KEY;
  }
}));
