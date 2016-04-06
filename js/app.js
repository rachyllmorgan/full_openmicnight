var app = angular.module('starter', ['firebase', 'ngRoute'])

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
      controller: 'LocationsCtrl',
      templateUrl: 'index.html'
  })
  .when('/locations', {
      controller: 'LocationsCtrl',
      templateUrl: 'locations.html'
  })
  .otherwise({
      redirectTo: '/'
  })
})

app.controller('LocationsCtrl', function($scope, $routeParams, $firebaseArray, $q) {

  $scope.selectedLocation = {name:"test"};
  $scope.locationId = $routeParams.locationId;

  var ref = new Firebase("https://openmicnight.firebaseio.com/locations");
  $scope.locations = $firebaseArray(ref);
  console.log("$scope.locations", $scope.locations);

  $scope.locations.$loaded()
    .then(function() {
      $scope.selectedLocation = $scope.locations.$getRecord($scope.locationId);
      console.log("$scope.selectedLocation", $scope.selectedLocation);
    })
    .catch(function(error) {
      console.log("Error:", error);
    });
});