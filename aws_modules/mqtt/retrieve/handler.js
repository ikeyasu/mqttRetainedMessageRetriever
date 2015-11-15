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
  var conf = {
    host: event.host,
    port: event.port,
    username: event.username,
    password: event.password,
  };

  _.merge(conf, globalConfig);
  var client = mqtt.connect(conf);

  setTimeout(function() {
    context.done("Error: Timeout");
  }, TIMEOUT_MSEC);

  client.on('error', function(error) {
    context.done(error, null);
  });

  client.on('connect', function() {
    console.log('connected to ' + conf.host);
    this.subscribe(event.topic);
  });

  client.on('message', function(topic, message, packet) {
    context.done(null, message.toString());
  });
};
