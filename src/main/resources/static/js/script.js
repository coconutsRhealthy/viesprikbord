var mainApp = angular.module("mainApp", []);

mainApp.controller('prikbordController', function($scope, $http) {

    $scope.imageUrlToPost = '';
    $scope.imageLinks;
    $scope.lightBoxImageUrl;
    $scope.style = "object-fit: cover; width: 200px; height: 200px; -webkit-transform: rotate(0deg); -moz-transform: rotate(0deg); -o-transform: rotate(0deg); -ms-transform: rotate(0deg); transform: rotate(0deg);"
    $scope.superMarkets = ["AH Helmholtzstraat"];
    $scope.selectedSupermarket = "AH Helmholtzstraat";
    $scope.showPreviewImage = false;
    $scope.rotation = 0;
    $scope.dataToSend = [];

    $http.post('/getImages').success(function(data) {
        $scope.imageLinks = data;
    })

    $scope.postImageUrl = function() {
       $scope.dataToSend = [$scope.selectedSupermarket, $scope.imageUrlToPost, $scope.rotation];

       $http.post('/postImageUrl', $scope.dataToSend).success(function(data) {
           alert(data);
       })
    }

    $scope.lightboxFunction = function(imageUrl) {
        $scope.lightBoxImageUrl = imageUrl;
    }

    $scope.flip = function() {
        if($scope.style.includes("(0deg)")) {
            $scope.style = "object-fit: cover; width: 200px; height: 200px; -webkit-transform: rotate(deg); -moz-transform: rotate(90deg); -o-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg);"
            $scope.rotation = 90;
        } else if($scope.style.includes("(90deg)")) {
            $scope.style = "object-fit: cover; width: 200px; height: 200px; -webkit-transform: rotate(deg); -moz-transform: rotate(180deg); -o-transform: rotate(180deg); -ms-transform: rotate(180deg); transform: rotate(180deg);"
            $scope.rotation = 180;
        } else if($scope.style.includes("(180deg)")) {
            $scope.style = "object-fit: cover; width: 200px; height: 200px; -webkit-transform: rotate(deg); -moz-transform: rotate(270deg); -o-transform: rotate(270deg); -ms-transform: rotate(270deg); transform: rotate(270deg);"
            $scope.rotation = 270;
        } else if($scope.style.includes("(270deg)")) {
            $scope.style = "object-fit: cover; width: 200px; height: 200px; -webkit-transform: rotate(deg); -moz-transform: rotate(0deg); -o-transform: rotate(0deg); -ms-transform: rotate(0deg); transform: rotate(0deg);"
            $scope.rotation = 0;
        }
    }

    $scope.showPreview = function() {
        $scope.showPreviewImage = true;
    }
});