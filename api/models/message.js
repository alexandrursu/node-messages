var mongoose = require("mongoose");
var is_palindrome = require("is-palindrome");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  text: String
});

module.exports = mongoose.model('Message', MessageSchema);
