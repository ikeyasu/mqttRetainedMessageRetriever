var CryptoJS = require("crypto-js");
var program = require('commander');

program
    .version('0.0.1')
    .option('-p, --password <password>', 'Password')
    .on('--help', function(){
      console.log('  Examples:');
      console.log('');
      console.log('    $ cat filename.json | ' + this.name() +' --password password');
      console.log('');
    })
    .parse(process.argv);

process.stdin.resume();
process.stdin.setEncoding('utf8');

var gInput = '';
process.stdin.on('data', function(chunk) {
    gInput += chunk;
});

process.stdin.on('end', function() {
    main(gInput);
});

function main(input){
  if (!program.password) return program.help();
  var encrypted = CryptoJS.AES.encrypt(input, program.password);
  var wordArray = CryptoJS.enc.Utf8.parse(encrypted.toString());
  var base64 = CryptoJS.enc.Base64.stringify(wordArray);
  console.log(base64);
}
