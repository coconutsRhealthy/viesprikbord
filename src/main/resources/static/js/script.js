var mainApp = angular.module("mainApp", []);

mainApp.controller('prikbordController', function($scope, $http) {

    $scope.imageUrlToPost;
    $scope.imageLinks;
    $scope.lightBoxImageUrl;

    $http.post('/getImageLinks').success(function(data) {
        $scope.imageLinks = data;
    })

    $scope.postImageUrl = function() {
       $http.post('/postImageUrl', $scope.imageUrlToPost).success(function(data) {
           alert(data);
       })
    }

    $scope.lightboxFunction = function(imageUrl) {
        $scope.lightBoxImageUrl = imageUrl;
    }
});