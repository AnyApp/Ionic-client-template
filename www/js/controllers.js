appControllers.controller('AppCtrl', function ($rootScope, $scope, $ionicSideMenuDelegate) {

});


appControllers.controller('LoginCtrl', function ($rootScope, $scope, $ionicPopup, Login) {
    $scope.credentials = {};

    $scope.login = function () {
        Login.login($scope.credentials, function (responseData) {
            if (!responseData.user) {
                $ionicPopup.alert({
                    title: 'שגיאה',
                    template: responseData.message
                });
            } else {
                $rootScope.user = responseData.user;
            }
        });
    };

    $scope.facebookLogin = function () {
        Login.facebook({}, function (responseData) {
            if (!responseData.user) {
                $ionicPopup.alert({
                    title: 'שגיאה',
                    template: responseData.message
                });
            } else {
                $rootScope.user = responseData.user;
            }
        });
    };

    $scope.googleLogin = function () {
        Login.google({}, function (responseData) {
            if (!responseData.user) {
                $ionicPopup.alert({
                    title: 'שגיאה',
                    template: responseData.message
                });
            } else {
                $rootScope.user = responseData.user;
            }
        });
    }
});

appControllers.controller('SignupCtrl', function ($scope, $ionicPopup, User) {
    $scope.user = {};

    $scope.signup = function () {
        User.save($scope.user, function (responseData) {
            if (!responseData.user) {
                $ionicPopup.alert({
                    title: 'שגיאה',
                    template: responseData.message
                });
            }
        });
    }
});

appControllers.controller('EditProfileCtrl', function ($rootScope, $scope, $cordovaImagePicker, $ionicPopup, User) {
    $scope.user = {};
    User.get({id: '55f6c9c9fba6737f431e6590'}, function (responseData) {
        if (!responseData) {
            $ionicPopup.alert({
                title: 'שגיאה',
                template: responseData.message
            });
        } else {
            $scope.user = responseData;
        }
    });

    $scope.save = function () {
        User.save($scope.user, function (responseData) {
            if (!responseData.user) {
                $ionicPopup.alert({
                    title: 'שגיאה',
                    template: responseData.message
                });
            }
        });
    };

    var options = {
        maximumImagesCount: 10,
        width: 800,
        height: 800,
        quality: 80
    };
    $scope.changePicture = function () {

        $cordovaImagePicker.getPictures(options)
            .then(function (results) {
                for (var i = 0; i < results.length; i++) {
                    console.log('Image URI: ' + results[i]);
                }
            }, function (error) {
                // error getting photos
            });
    }
});
