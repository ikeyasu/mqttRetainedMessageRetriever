/**
 * AWS Module: Action: Modularized Code
 */

var generatePassword = require("password-generator");
var passwordDb = require("./passworddb.js");

function generateApiKey() {
  return generatePassword(5) + "-" + generatePassword(5) + "-" + generatePassword(5) +
    "-" + generatePassword(5) + "-" + generatePassword(5);
}

var uppercaseMinCount = 3;
var lowercaseMinCount = 3;
var numberMinCount = 2;
var specialMinCount = 2;
var UPPERCASE_RE = /([A-Z])/g;
var LOWERCASE_RE = /([a-z])/g;
var NUMBER_RE = /([\d])/g;
var SPECIAL_CHAR_RE = /([\?\-\.\_\+])/g;
var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

function isStrongEnough(password) {
  var uc = password.match(UPPERCASE_RE);
  var lc = password.match(LOWERCASE_RE);
  var n = password.match(NUMBER_RE);
  var sc = password.match(SPECIAL_CHAR_RE);
  var nr = password.match(NON_REPEATING_CHAR_RE);
  return !nr && uc && uc.length >= uppercaseMinCount &&
    lc && lc.length >= lowercaseMinCount &&
    n && n.length >= numberMinCount &&
    sc && sc.length >= specialMinCount;
}

function generateApiPassword() {
  var password = "";
  while (!isStrongEnough(password)) {
    password = generatePassword(40, false, /[\w\d\?\-\.\_\+]/);
  }
  return password;
}

// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  var result = {key: generateApiKey(), password: generateApiPassword()};
  passwordDb.put(result, function(error, data) {
    return cb(null, result);
  });
};

