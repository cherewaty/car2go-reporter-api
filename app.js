require('dotenv').config();

var express = require('express');
var proxy = require('express-http-proxy');
var cors = require('cors');

var app = express();

app.set('port', (process.env.PORT || 3000));

var whitelist = (process.env.CORS_WHITELIST || []);
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.listen(app.get('port'), function () {
  console.log('car2go Reporter API listening on port', app.get('port'));
});

app.use('/proxy/car2go', cors(corsOptions), proxy('www.car2go.com', {
  https: true,
  proxyReqPathResolver: function(req) {
    if(process.env.CAR2GO_OAUTH_CONSUMER_KEY) {
      return require('url').parse(req.url).path + '&oauth_consumer_key=' + process.env.CAR2GO_OAUTH_CONSUMER_KEY;
    } else {
      return require('url').parse(req.url).path;
    }
  }
}));
