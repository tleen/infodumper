'use strict';

var express = require('express'),
    ip = require('ip'),
    moment = require('moment'),
    os = require('os'),
    prettyjson = require('prettyjson');


var router = module.exports = express.Router();

var hostname = os.hostname();
var ipAddress = ip.address();

/* call test address url, get result, replace statically generated dates with now */
router.use('*', function(req, res, next){

  var now = moment();
  var data = {
    'time' : {
      'datetime': now.format(),
      'timestamp': now.format('x')      
    },
    'server' : {
      'ip': ipAddress,
      'hostname': hostname
    },
    'http' : {
      'request': req.headers
    },
  };

  if(req.accepts('application/json')){
    return res.json(data);
  }else{
    return res.
      type('text/plain').
      send(
	prettyjson.render(data, {
	  noColor: true
	}));
  }
});
