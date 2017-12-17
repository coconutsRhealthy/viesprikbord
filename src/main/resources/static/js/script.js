var mainApp = angular.module("mainApp", []);

mainApp.controller('prikbordController', function($scope, $http) {

    $scope.imageUrlToPost = '';
    $scope.images;
    $scope.lightBoxImageUrl;
    $scope.lightBoxImageStyle;
    $scope.styleUploadPreview = "object-fit: cover; width: 200px; height: 200px; -webkit-transform: rotate(0deg); -moz-transform: rotate(0deg); -o-transform: rotate(0deg); -ms-transform: rotate(0deg); transform: rotate(0deg);"
    $scope.superMarkets = ["AH Helmholtzstraat"];
    $scope.selectedSupermarket = "AH Helmholtzstraat";
    $scope.showPreviewImage = false;
    $scope.rotation = 0;
    $scope.dataToSend = [];

    $scope.styleImage;

    $http.post('/getImages').success(function(data) {
        $scope.images = data;
    })

    $scope.postImageUrl = function() {
       $scope.dataToSend = [$scope.selectedSupermarket, $scope.imageUrlToPost, $scope.rotation];

       $http.post('/postImageUrl', $scope.dataToSend).success(function(data) {
           alert(data);
       })
    }

    $scope.lightboxFunction = function(imageUrl, rotation) {
        $scope.lightBoxImageUrl = imageUrl;
        $scope.lightBoxImageStyle = getLightBoxImageStyle(rotation);
    }

    $scope.flip = function() {
        if($scope.styleUploadPreview.includes("(0deg)")) {
            $scope.styleUploadPreview = "object-fit: cover; width: 200px; height: 200px; -webkit-transform: rotate(deg); -moz-transform: rotate(90deg); -o-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg);"
            $scope.rotation = 90;
        } else if($scope.styleUploadPreview.includes("(90deg)")) {
            $scope.styleUploadPreview = "object-fit: cover; width: 200px; height: 200px; -webkit-transform: rotate(deg); -moz-transform: rotate(180deg); -o-transform: rotate(180deg); -ms-transform: rotate(180deg); transform: rotate(180deg);"
            $scope.rotation = 180;
        } else if($scope.styleUploadPreview.includes("(180deg)")) {
            $scope.styleUploadPreview = "object-fit: cover; width: 200px; height: 200px; -webkit-transform: rotate(deg); -moz-transform: rotate(270deg); -o-transform: rotate(270deg); -ms-transform: rotate(270deg); transform: rotate(270deg);"
            $scope.rotation = 270;
        } else if($scope.styleUploadPreview.includes("(270deg)")) {
            $scope.styleUploadPreview = "object-fit: cover; width: 200px; height: 200px; -webkit-transform: rotate(deg); -moz-transform: rotate(0deg); -o-transform: rotate(0deg); -ms-transform: rotate(0deg); transform: rotate(0deg);"
            $scope.rotation = 0;
        }
    }

    $scope.showPreview = function() {
        $scope.showPreviewImage = true;
    }

    $scope.getImageStyle = function(rotation) {
        return "-webkit-transform: rotate(deg); -moz-transform: rotate(" + rotation + "deg); -o-transform: rotate(" + rotation + "deg); -ms-transform: rotate(" + rotation + "deg); transform: rotate(" + rotation + "deg);"
    }

    function getLightBoxImageStyle(rotation) {
        return "-webkit-transform: rotate(deg); -moz-transform: rotate(" + rotation + "deg); -o-transform: rotate(" + rotation + "deg); -ms-transform: rotate(" + rotation + "deg); transform: rotate(" + rotation + "deg);"
    }
});