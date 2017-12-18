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

    $scope.setLightBoxImageUrl = function(imageUrl, rotation) {
        $scope.lightBoxImageUrl = imageUrl;
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

//    $scope.getImageStyle = function(rotation) {
//
////        var toReturn = '';
////
////        if(rotation == 90) {
////            toReturn = "height: 250px; width: 250px; -webkit-transform: rotate(deg); -moz-transform: rotate(" + rotation + "deg); -o-transform: rotate(" + rotation + "deg); -ms-transform: rotate(" + rotation + "deg); transform: rotate(" + rotation + "deg);"
////        } else {
////            toReturn = "-webkit-transform: rotate(deg); -moz-transform: rotate(" + rotation + "deg); -o-transform: rotate(" + rotation + "deg); -ms-transform: rotate(" + rotation + "deg); transform: rotate(" + rotation + "deg);"
////        }
////        return toReturn;
//
//        return "-webkit-transform: rotate(deg); -moz-transform: rotate(" + rotation + "deg); -o-transform: rotate(" + rotation + "deg); -ms-transform: rotate(" + rotation + "deg); transform: rotate(" + rotation + "deg);"
//    }


//    $scope.getImageClass = function(rotation) {
//        if(rotation == 90) {
//            return "fixed-height-image rotated-90";
//        } else if(rotation == 180) {
//            return "fixed-height-image rotated-180";
//        } else if(rotation == 270) {
//            return "fixed-height-image rotated-270";
//        } else {
//            return "fixed-height-image";
//        }
//    }



//    function getLightBoxImageClass(rotation) {
//        if(rotation == 90) {
//            return "modal rotated-90";
//        } else if(rotation == 180) {
//            return "modal rotated-180";
//        } else if(rotation == 270) {
//            return "modal rotated-270";
//        } else {
//            return "modal";
//        }
//
//
//        //return "-webkit-transform: rotate(deg); -moz-transform: rotate(" + rotation + "deg); -o-transform: rotate(" + rotation + "deg); -ms-transform: rotate(" + rotation + "deg); transform: rotate(" + rotation + "deg);"
//    }


    $scope.getRotationClass = function(rotation) {
        if(rotation == 90) {
            return "rotated-90";
        } else if(rotation == 180) {
            return "rotated-180";
        } else if(rotation == 270) {
            return "rotated-270";
        } else {
            return "";
        }
    }


});