/* global angular, $ */
var nodeMessages = angular.module('messageApp', [])

nodeMessages.controller('messageController', function ($scope, $http) {
  $scope.currentMessage
  $scope.newMessage
  $scope.errorMessage
  $scope.messagesEndpoint
  $http.get('endpoint.config').then(
    function (response) {
      $scope.messagesEndpoint = response.data
      // initial load of messages
      $scope.getMessages()
    },
    function (response) {
      $scope.handleError('Endpoint Config not found', response)
    })

  // generic method to handle errors. takes a message and error object
  $scope.handleError = function (message, error) {
    console.log(message)
    $scope.errorMessage = message

    if (error) {
      console.log(error)
    }

    $('#error-alert').show()
  }

  // hides the error alert
  $scope.hideError = function () {
    $('#error-alert').hide()
  }

  // retrieves messages from the Node Messages API
  $scope.getMessages = function () {
    $http.get($scope.messagesEndpoint).then(
      function (response) {
        $scope.messages = response.data
      },
      function (response) {
        $scope.handleError('Error retrieving messages', response)
      })
  }

  // calls the Node Messages API to remove the given message
  $scope.deleteMessage = function (id) {
    $http.delete($scope.messagesEndpoint + id).then(
      function (response) {
        $scope.getMessages()
      },
      function (response) {
        $scope.handleError('Error deleting message', response)
      })
  }

  // calls the Node Messages API to retrieve details about
  // the given message
  $scope.showDetails = function (id) {
    $http.get($scope.messagesEndpoint + id).then(
      function (response) {
        $scope.currentMessage = response.data
        $('#detailsModal').modal('show')
      },
      function (response) {
        $scope.handleError('Error retrieving details', response)
      })
  }

  // calls the Node Messages API to add a message
  $scope.addMessage = function () {
    $http.post($scope.messagesEndpoint, $scope.newMessage).then(
      function (response) {
        $scope.newMessage = null
        $scope.getMessages()
      },
      function (response) {
        $scope.handleError('Error adding message', response)
      })
  }
})
