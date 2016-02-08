var testosterone = require('testosterone')({port: 8080})
var assert = testosterone.assert

var inserted_id

// test to pass
testosterone
  // Test to Pass - Sending a GET request to list messages
  .get('/messages', function (res) {
    assert.equal(res.statusCode, 200, 'status code not 200 on messages GET')
  })
  // Test to Pass - Sending a POST request with valid text
  .post('/messages', { data: { text: 'test this' } }, function (res) {
    assert.equal(res.statusCode, 201, 'status code not 201 on messages POST')
    var body = JSON.parse(res.body)
    assert.ok(body.id != null, 'missing id')
    inserted_id = body.id
  })

if (inserted_id != null) {
  testosterone
    // Test to Pass - Sending a GET request with a valid id
    .get('/messages/' + inserted_id, function (res) {
      assert.equal(res.statusCode, 200, 'status code not 200 on messages/:id GET')
      var body = JSON.parse(res.body)
      assert.equal(body.text, 'test this', 'body test is not equal on messages/:id GET')
      assert.equal(body.isPalindrome, false, 'isPalindrome is not false as expected')
    })
    // Test to Pass - Sending a DELETE request with a valid id
    .delete('/messages/' + inserted_id, function (res) {
      assert.equal(res.statusCode, 200, 'status code not 200 on messages/:id DELETE')
    })
}

inserted_id = null

testosterone
  .post('/messages', { data: { text: 'was it tims mitt i saw' } }, function (res) {
    assert.equal(res.statusCode, 201, 'status code not 201 on messages POST')
    var body = JSON.parse(res.body)
    assert.ok(body.id != null, 'missing id')
    inserted_id = body.id
  })

if (inserted_id != null) {
  testosterone
    .get('/messages/' + inserted_id, function (res) {
      assert.equal(res.statusCode, 200, 'status code not 200 on messages/:id GET (palindrome)')
      var body = JSON.parse(res.body)
      assert.equal(body.isPalindrome, true, 'isPalindrome is not true as expected on messages/:id GET (palindrome)')
    })
}

testosterone
  // Test to Fail - Sending a POST with no valid text
  .post('/messages', { data: {} }, function (res) {
    assert.equal(res.statusCode, 400, 'status code not 400 on messages POST TTF')
  })
  // Test to Fail - Sending a GET with an id that does not exist
  .get('/messages/56a6e1a8db360c8a623d6eb4', function (res) {
    assert.equal(res.statusCode, 404, 'status code not 404 on messages/:id GET Non-existent ID TTF')
  })
  // Test to Fail - Sending a GET with an invalid id
  .get('/messages/-1', function (res) {
    assert.equal(res.statusCode, 500, 'status code not 500 on messages/:id GET Invalid ID TTF')
  })
  // Test to Fail - Sending a DELETE with an id that does not exist
  .delete('/messages/56a6e1a8db360c8a623d6eb4', function (res) {
    assert.equal(res.statusCode, 200, 'status code not 200 on messages/:id DELETE Non-existent ID TTF')
  })
  // Test to Fail - Sending a DELETE with an invalid id
  .delete('/messages/-1', function (res) {
    assert.equal(res.statusCode, 500, 'status code not 500 on messages/:id DELETE Invalid ID TTF')
  })
