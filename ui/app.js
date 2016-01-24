var nodeMessages = angular.module("messageApp", []);

nodeMessages.controller('messageController',function ($scope,$http) {

  $scope.currentMessage;
  $scope.newMessage;
  $scope.errorMessage;
  $scope.messagesEndpoint = "<messagesEndpoint>";

  // generic method to handle errors. takes a message and error object
  $scope.handleError = function(message, error) {
    console.log(message);
    $scope.errorMessage = message;

    if (error)
      console.log(error);

    $("#error-alert").show();
  };

  // hides the error alert
  $scope.hideError = function() {
    $("#error-alert").hide();
  };

  // retrieves messages from the Node Messages API
  $scope.getMessages = function() {
    $http.get($scope.messagesEndpoint)
      .success(function(data) {
        $scope.messages = data;
      })
      .error(function(data) {
        $scope.handleError("Error retrieving messages", data);
      });
  };

  // initial load of messages
  $scope.getMessages();

  // calls the Node Messages API to remove the given message
  $scope.deleteMessage = function(id) {
    $http.delete($scope.messagesEndpoint+id)
      .success(function(data) {
        $scope.getMessages(); 
      })
      .error(function(data) {
        $scope.handleError("Error deleting message", data);
      });
  };

  // calls the Node Messages API to retrieve details about
  // the given message
  $scope.showDetails = function(id) {
    $http.get($scope.messagesEndpoint+id)
      .success(function(data) {
        $scope.currentMessage = data;
        $("#detailsModal").modal("show");
      })
      .error(function(data) {
        $scope.handleError("Error retrieving details", data);
      });
  };

  // calls the Node Messages API to add a message
  $scope.addMessage = function() {
    console.log($scope.newMessage);
    $http.post($scope.messagesEndpoint,$scope.newMessage)
      .success(function(data) {
        $scope.getMessages();
      })
      .error(function(data) {
        $scope.handleError("Error adding message", data);
      });
  };
});
