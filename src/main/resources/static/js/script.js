var mainApp = angular.module("mainApp", []);

mainApp.controller('prikbordController', function($scope, $http) {

    $scope.imageUrlToPost;
    $scope.imageLinks;

    $http.post('/getImageLinks').success(function(data) {
        $scope.imageLinks = data;
    })

    $scope.postImageUrl = function() {
       $http.post('/postImageUrl', $scope.imageUrlToPost).success(function(data) {
           alert(data);
       })
    }

});