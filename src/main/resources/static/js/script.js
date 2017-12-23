var mainApp = angular.module("mainApp", []);

mainApp.controller('prikbordController', function($scope, $http) {

    $scope.imageUrlToPost = '';
    $scope.images;
    $scope.lightBoxImageUrl;
    $scope.lightBoxRotation;
    $scope.styleUploadPreview = "object-fit: cover; width: 200px; height: 200px; -webkit-transform: rotate(0deg); -moz-transform: rotate(0deg); -o-transform: rotate(0deg); -ms-transform: rotate(0deg); transform: rotate(0deg);"
    $scope.supermarketForDbPost = '';
    $scope.showPreviewImage = false;
    $scope.rotation = 0;
    $scope.dataToSend = [];
    $scope.lightBoxOpen;
    $scope.counter = 0;
    $scope.postButtonIsDisabled = true;
    $scope.chooseSupermarketButtonTextUpload = "Kies Supermarkt";
    $scope.postButtonText = "Post";
    $scope.postBtnCssClass = "btn-primary";

    var page = window.location.href;

    if(page.includes("helmholtz")) {
        $http.post('/getImages', "AH Helmholtzstraat").success(function(data) {
            $scope.images = data;
        })
    }

    if(page.includes("coganeplein")) {
        $http.post('/getImages', "AH Land van Cocagneplein").success(function(data) {
            $scope.images = data;
        })
    }

    $scope.postImageUrl = function() {
       if($scope.postButtonText === "Bekijk je advertentie!") {
          goToNewPlacedAdPage();
       } else {
          $scope.dataToSend = [$scope.supermarketForDbPost, $scope.imageUrlToPost, $scope.rotation];

          $http.post('/postImageUrl', $scope.dataToSend).success(function(data) {
               $scope.postButtonText = "Bekijk je advertentie!";
               $scope.postBtnCssClass = "btn-success";
          })
       }
    }

    function goToNewPlacedAdPage() {
        if($scope.supermarketForDbPost === "AH Helmholtzstraat") {
            window.location.href = "helmholtz.html";
        } else if($scope.supermarketForDbPost === "AH Land van Cocagneplein") {
            window.location.href = "coganeplein.html";
        }
    }

    $scope.lightboxFunction =  function(imageUrl, rotation) {
        $scope.lightBoxImageUrl = imageUrl;
        $scope.lightBoxRotation = rotation;
        $scope.lightBoxOpen = true;
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

    $scope.getRotationClassXsViewport = function(rotation) {
        if(rotation == 90) {
            return "fixed-height-image-vw-xs rotated-90";
        } else if(rotation == 180) {
            return "fixed-height-image rotated-180";
        } else if(rotation == 270) {
            return "fixed-height-image-vw-xs rotated-270";
        } else {
            return "fixed-height-image";
        }
    }

    $scope.getLightBoxRotationClass = function() {
        if($scope.lightBoxRotation == 90) {
            return "rotated-90";
        } else if($scope.lightBoxRotation == 180) {
            return "rotated-180";
        } else if($scope.lightBoxRotation == 270) {
            return "rotated-270";
        } else {
            return "";
        }
    }

    window.onclick = function(event) {
        if($scope.lightBoxOpen == true) {
            $scope.counter++;

            if($scope.counter % 2 == 0) {
                $('#myModal').modal('hide');
                $scope.counter = 0;
                $scope.lightBoxOpen == false;
            }

        }
    }

    $scope.setSupermarketForDbPost = function(superMarket) {
        $scope.chooseSupermarketButtonTextUpload = superMarket;
        $scope.supermarketForDbPost = superMarket;
    }
});