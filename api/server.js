var express = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var is_palindrome = require('is-palindrome');

var Message = require('./models/message.js');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://palindrome-rw:demo-rw@ec2-52-91-189-176.compute-1.amazonaws.com:27017/messages'); // connect to our database

router.get("/", function(req,res) { res.json({ message: "Welcome to the Messages API" }); } );

router.route("/messages")
  .post(function(req,res) {
    var message = new Message();
    message.text = req.body.text;
    message.save();
    res.json({ status: 0 });
  })
  .get(function(req,res) {
    Message.find(function(err, messages) {
      if (err)
        res.send(err);
      res.json(messages);
    });
  });

router.route("/messages/:id")
  .delete(function(req,res) {
    Message.remove({
      _id:req.params.id
      }, function(err, message) {
        if (err)
          res.send(err);
        res.json({status: 0});
      });
  })
  .get(function(req,res) {
    Message.findById(req.params.id,function(err,message) {
      if (err)
        res.send(err);
      var obj = message.toObject();
      obj.is_palindrome = is_palindrome(obj.text);
      res.json(obj);
    });
  });

app.use("/",router);

app.listen(8080);
