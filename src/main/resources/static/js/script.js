var mainApp = angular.module("mainApp", []);

mainApp.controller('prikbordController', function($scope, $http) {

    $scope.imageUrl;

    $scope.postImageUrl = function() {
       $http.post('/postImageUrl', $scope.imageUrl).success(function(data) {
           alert(data);
       })
    }

});