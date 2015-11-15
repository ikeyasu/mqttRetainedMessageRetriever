'use strict';

/**
 * AWS Module: Action: Lambda Handler
 * "Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent"
 */

require('jaws-core-js/env');
var mqtt = require('mqtt');
var _ = require('lodash');

var globalConfig = {
  "protocol": "mqtt",
  "keepalive": 10000,
  "rejectUnauthorized": false
};
var TIMEOUT_MSEC = 10 * 1000; // 10 sec

// Lambda Handle
module.exports.handler = function(event, context) {
  setTimeout(function() {
    return context.done("Error: Timeout", null);
  }, TIMEOUT_MSEC);

  if (event.apikey) {
    var passwordDb = require('../../app/password/passworddb.js');
    passwordDb.get(event.apikey, function(data) {
      var cryptoJS = require('crypto-js');
      console.log(event.encrypted);
      var parsedWordArray = cryptoJS.enc.Base64.parse(event.encrypted);
      var parsedStr = parsedWordArray.toString(cryptoJS.enc.Utf8);
      var decryptedBuf = cryptoJS.AES.decrypt(parsedStr, data.Item.password);
      var conf = JSON.parse(decryptedBuf.toString(cryptoJS.enc.Utf8));
      _.merge(conf, globalConfig);
      retrieveRetainedMessage(conf, context);
    });
  } else {
    retrieveRetainedMessage(event, context);
  }
};

function retrieveRetainedMessage(options, context) {
  var conf = {
    host: options.host,
    port: options.port,
    username: options.username,
    password: options.password
  };
  _.merge(conf, globalConfig);
  var client = mqtt.connect(conf);

  client.on('error', function(error) {
    return context.done(error, null);
  });

  client.on('connect', function() {
    console.log('connected to ' + conf.host);
    this.subscribe(options.topic);
  });

  client.on('message', function(topic, message, packet) {
    return context.done(null, message.toString());
  });
}
