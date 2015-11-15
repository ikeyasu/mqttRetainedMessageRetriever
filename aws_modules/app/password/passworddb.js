var AWS = require('aws-sdk');
var awsOptions = {region: 'us-east-1'};
if (process.env.JAWS_LOCAL === 'local') {
  console.warn('EnvVar:JAWS_LOCAL is "local". It is debug mode locally.');
  awsOptions.endpoint = 'http://localhost:8000';
}
AWS.config.update(awsOptions);
var dynamodb = new AWS.DynamoDB({
  region: 'us-east-1',
  credentials: new AWS.Credentials(process.env.API_KEY, process.env.API_SECRET, null)
});
var TABLE_NAME = 'dSwitchDeviceMqttRetainedMessageRetrieverPassword';

function createTable(done) {
  var params = {
    TableName : TABLE_NAME,
    KeySchema: [
      { AttributeName: 'key', KeyType: 'HASH'}
    ],
    AttributeDefinitions: [
      { AttributeName: 'key', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  };

  dynamodb.createTable(params, function(err, data) {
    if (!err) {
      console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    if (done) done();
  });
};

module.exports.put = function(e, cb) {
  createTable(function() {
    var dynamodbDoc = new AWS.DynamoDB.DocumentClient();
    dynamodbDoc.put({'TableName':TABLE_NAME,
      'Item': e
    }, function(err, data) {
      if (err) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
      } else {
        console.log('Added item', e.key);
      }
      if (cb) cb(err, data);
    });
  });
};

module.exports.get = function(key, cb) {
  createTable(function() {
    var dynamodbDoc = new AWS.DynamoDB.DocumentClient();
    dynamodbDoc.get({'TableName':TABLE_NAME,
      Key: {
        key: key
      }
    }, function(err, data) {
      cb(err ? null : data);
    });
  });
};
