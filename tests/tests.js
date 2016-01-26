var testosterone = require('testosterone')({port: 8080})
  , assert = testosterone.assert;

  var inserted_id;

// test to pass
testosterone
  // TESTING RETRIEVING MESSAGES
  .get('/messages', function (res) {
    assert.equal(res.statusCode, 200, 'status code not 200 on messages GET');
  })
  // TESTING ADDING MESSAGE
  .post('/messages', { data: {text: 'test this'}}, function(res) {
    assert.equal(res.statusCode, 200, 'status code not 200 on messages POST');
    var body = JSON.parse(res.body);
    assert.ok(body._id != undefined, 'missing _id');
    assert.equal(body.text,'test this', 'body text is not equal on messages POST');
    inserted_id = body._id;
  });

if (inserted_id != undefined) {
  testosterone
    // TESTING RETRIEVING MESSAGE BY ID
    .get('/messages/'+inserted_id, function (res) {
      assert.equal(res.statusCode, 200, 'status code not 200 on messages/:id GET');
      var body = JSON.parse(res.body);
      assert.equal(body.text,'test this','body test is not equal on messages/:id GET');
    })
    // TESTING DELETING MESSAGE BY ID
    .delete('/messages/'+inserted_id, function(res) {
      assert.equal(res.statusCode, 200, 'status code not 200 on messages/:id DELETE');
    });
}

testosterone
  .post('/messages', { data: {}}, function(res) {
    assert.equal(res.statusCode, 422, 'status code not 422 on messages POST TTF');
  })
  .get('/messages/56a6e1a8db360c8a623d6eb4', function(res) {
    assert.equal(res.statusCode, 404, 'status code not 404 on messages/:id GET Non-existent ID TTF');
  })
  .get('/messages/-1', function(res) {
    assert.equal(res.statusCode, 500, 'status code not 500 on messages/:id GET Invalid ID TTF');
  })
  .delete('/messages/56a6e1a8db360c8a623d6eb4', function(res) {
    assert.equal(res.statusCode, 404, 'status code not 404 on messages/:id DELETE Non-existent ID TTF');
  })
  .delete('/messages/-1', function(res) {
    assert.equal(res.statusCode, 500, 'status code not 500 on messages/:id DELETE Invalid ID TTF');
  })
