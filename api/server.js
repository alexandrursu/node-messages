var express = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var is_palindrome = require('is-palindrome');
var Message = require('./models/message.js');

var mongoConnectionString = "<mongoConnectionString";

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(mongoConnectionString); // connect to our database

var allowCrossDomain = function(req,res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

router.route("/messages")
  .post(function(req,res) {
    var message = new Message();
    message.text = req.body.text;
    message.save(function(err) {
      if (err)
        res.status(err.statusCode || 500).json(err);
      else
        res.json({ status: 0 });
    });
  })
  .get(function(req,res) {
    Message.find(function(err, messages) {
      if (err)
        res.status(err.statusCode || 500).json(err);
      else
        res.json(messages);
    });
  });

router.route("/messages/:id")
  .delete(function(req,res) {
    Message.remove({
      _id:req.params.id
      }, function(err, message) {
        if (err)
          res.status(err.statusCode || 500).json(err);
        else
          res.json({status: 0});
      });
  })
  .get(function(req,res) {
    Message.findById(req.params.id,function(err,message) {
      if (err)
        res.status(err.statusCode || 500).json(err);
      else {
        var obj = message.toObject();
        obj.is_palindrome = is_palindrome(obj.text);
        res.json(obj);
      }
    });
  });

app.use(allowCrossDomain);
app.use("/",router);

app.listen(8080);
