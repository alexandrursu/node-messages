var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var isPalindrome = require('is-palindrome')
var Message = require('./models/message.js')

try {
  var mongoConnection = require('./mongo.json')
} catch (e) {
  console.log('Mongo connection file does not exist')
  process.exit()
}

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(mongoConnection.uri) // connect to our database

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  next()
}

router.route('/')
  .get(function (req, res) {
    res.json({ message: 'Welcome to the Messages API' })
  })

router.route('/messages')
  /**
   * @api {post} /messages/ Add Message
   * @apiName AddMessage
   * @apiGroup Message
   * @apiVersion 1.0.0
   *
   * @apiDescription Add a new message to the system
   * @apiParam {String} text The text for the message
   *
   * @apiSuccess {ObjectID} id The unique identifier for the message
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 201 Created
   *     {
   *       'id': '56a5652c55ab891352f11fd0'
   *     }
   * @apiError (400) BadRequest The text parameter was not specified
   */
  .post(function (req, res) {
    if (req.body.text == null) {
      res.status(400).json({ message: "post missing 'text' parameter" })
      return
    }
    var newMessage = new Message()
    newMessage.text = req.body.text
    newMessage.save(function (err, message) {
      if (err) {
        res.status(err.statusCode || 500).json(err)
      } else {
        res.status(201).json({ id: message._id })
      }
    })
  })
  /**
   * @api {get} /messages/ List Messages
   * @apiName ListMessages
   * @apiGroup Message
   * @apiVersion 1.0.0
   *
   * @apiDescription List all messages in the system
   * @apiSuccess {Object[]} messages A list of messages
   * @apiSuccess {ObjectID} messages._id The unique identifier for the message
   * @apiSuccess {String} messages.text The message text
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     [
   *       {
   *         '_id': '56a5652c55ab891352f11fd0',
   *         'text': 'first message here'
   *       },
   *       {
   *         '_id': '56a5652c55ab891352f11fd5',
   *         'text': 'was it tims mitt i saw'
   *       }
   *     ]
   */
  .get(function (req, res) {
    Message.find(function (err, messages) {
      if (err) {
        res.status(err.statusCode || 500).json(err)
      } else {
        res.json(messages)
      }
    })
  })

router.route('/messages/:id')
  /**
   * @api {delete} /messages/:id Delete Message
   * @apiName DeleteMessage
   * @apiGroup Message
   * @apiVersion 1.0.0
   *
   * @apiDescription Delete a message from the system
   * @apiParam {ObjectID} :id The unique identifier for the message
   *
   * @apiSuccess {String} message The message 'record deleted'
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       'message': 'record deleted'
   *     }
   */
  .delete(function (req, res) {
    Message.remove({
      _id: req.params.id
    }, function (err, message) {
      if (err) {
        res.status(err.statusCode || 500).json(err)
      } else {
        res.status(200).json({ message: 'record deleted' })
      }
    })
  })
  /**
   * @api {get} /messages/:id Get Message Details
   * @apiName GetMessage
   * @apiGroup Message
   * @apiVersion 1.0.0
   *
   * @apiDescription Give details about a message in the system
   * @apiParam {ObjectID} :id The unique identifier for the message
   *
   * @apiSuccess {Object} message The requested message
   * @apiSuccess {ObjectID} message._id The unique identifier for the message
   * @apiSuccess {String} message.text The message text
   * @apiSuccess {Boolean} message.isPalindrome If the message is a palindrome
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       '_id': '56a5652c55ab891352f11fd0',
   *       'text': 'first message here'
   *       'isPalindrome': false
   *     }
   * @apiError (404) NotFound The requested message was not found
   * @apiError (500) InternalServerError The identifier specified was invalid
   */
  .get(function (req, res) {
    Message.findById(req.params.id, function (err, message) {
      if (err) {
        res.status(err.statusCode || 500).json(err)
      } else if (message == null) {
        res.status(404).json({ message: 'record not found' })
      } else {
        var obj = message.toObject()
        obj.isPalindrome = isPalindrome(obj.text)
        res.json(obj)
      }
    })
  })

app.use(allowCrossDomain)
app.use('/', router)

app.listen(8080)
