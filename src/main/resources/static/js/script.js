var mainApp = angular.module("mainApp", []);

mainApp.controller('prikbordController', function($scope, $http) {

    $scope.imageUrlToPost;
    $scope.imageLinks;
    $scope.lightBoxImageUrl;
    $scope.style = "max-width: 200px; max-height: 200px; -webkit-transform: rotate(0deg); -moz-transform: rotate(0deg); -o-transform: rotate(0deg); -ms-transform: rotate(0deg); transform: rotate(0deg);"

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

    $scope.flip = function() {
        if($scope.style.includes("(0deg)")) {
            $scope.style = "max-width: 200px; max-height: 200px; -webkit-transform: rotate(deg); -moz-transform: rotate(90deg); -o-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg);"
        } else if($scope.style.includes("(90deg)")) {
            $scope.style = "max-width: 200px; max-height: 200px; -webkit-transform: rotate(deg); -moz-transform: rotate(180deg); -o-transform: rotate(180deg); -ms-transform: rotate(180deg); transform: rotate(180deg);"
        } else if($scope.style.includes("(180deg)")) {
            $scope.style = "max-width: 200px; max-height: 200px; -webkit-transform: rotate(deg); -moz-transform: rotate(270deg); -o-transform: rotate(270deg); -ms-transform: rotate(270deg); transform: rotate(270deg);"
        } else if($scope.style.includes("(270deg)")) {
            $scope.style = "max-width: 200px; max-height: 200px; -webkit-transform: rotate(deg); -moz-transform: rotate(0deg); -o-transform: rotate(0deg); -ms-transform: rotate(0deg); transform: rotate(0deg);"
        }
    }
});