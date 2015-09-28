appControllers.controller('AppCtrl', function ($rootScope, $scope, $ionicSideMenuDelegate) {

});


appControllers.controller('MenuCtrl', function ($rootScope, $scope, $state, Login, User) {

    $scope.logout = function () {
        Login.logout(function (responseData) {
            $state.go('login');
        });
    };
});

appControllers.controller('LoginCtrl', function ($rootScope, $scope, $ionicPopup, $state, $cordovaOauth, Login) {
    $scope.credentials = {};

    $scope.login = function () {
        Login.login($scope.credentials, function (responseData) {

            if (responseData['status'] && responseData['status'] == 1) {
                var data = responseData['data'];
                $rootScope.user = data.user;
                $state.go('app.searchCabs');
            }
            else {
                $ionicPopup.alert({
                    title: 'שגיאה',
                    template: responseData.msg || 'אין תשובה מהשרת'
                });
            }
        });
    };

    $scope.facebookLogin = function () {
        $cordovaOauth.facebook("808294869269670", ["email", "user_photos"]).then(function(result) {
            Login.facebook(result, function (responseData) {
                if (responseData['status'] && responseData['status'] == 1) {
                    var data = responseData['data'];
                    $rootScope.user = data.user;
                    $state.go('app.searchCabs');
                }
                else {
                    $ionicPopup.alert({
                        title: 'שגיאה',
                        template: responseData.msg || 'אין תשובה מהשרת'
                    });
                }
            });
        }, function(error) {
            $ionicPopup.alert({
                title: 'שגיאה',
                template: error || 'אין תשובה מהשרת'
            });
        });
    };

    $scope.googleLogin = function () {
        $cordovaOauth.google("680729757298-aqvh71v8fh2ni76h6dk20221jihck14b.apps.googleusercontent.com", ["email"]).then(function(result) {
            Login.google(result, function (responseData) {
                if (responseData['status'] && responseData['status'] == 1) {
                    var data = responseData['data'];
                    $rootScope.user = data.user;
                    $state.go('app.searchCabs');
                }
                else {
                    $ionicPopup.alert({
                        title: 'שגיאה',
                        template: responseData.msg || 'אין תשובה מהשרת'
                    });
                }
            });
        }, function(error) {
            $ionicPopup.alert({
                title: 'שגיאה',
                template: error || 'אין תשובה מהשרת'
            });
        });
    };
});

appControllers.controller('SignupCtrl', function ($scope, $ionicPopup, $state, User) {
    $scope.user = {};

    $scope.signup = function () {
        User.save($scope.user, function (responseData) {
            if (responseData.username != $scope.user.username) {
                $ionicPopup.alert({
                    title: 'שגיאה',
                    template: responseData.message
                });
            } else {
                $state.go('login');
            }
        });
    }
});

appControllers.controller('EditProfileCtrl', function ($rootScope, $scope, $cordovaImagePicker, $cordovaFileTransfer, $ionicPopup, User, File) {

    $scope.save = function () {
        User.save($rootScope.user, function (responseData) {
            //console.log(responseData);
        });
    };

    var options = {
        maximumImagesCount: 1
    };

    $scope.changePicture = function () {
        $cordovaImagePicker.getPictures(options)
            .then(function (results) {
                var server = urlBase + '/file/upload';
                for (var i = 0; i < results.length; i++) {
                    $cordovaFileTransfer.upload(server, results[i], {})
                        .then(function (result) {
                            var response = JSON.parse(result.response);

                            if (response.data && response.data.files.length > 0) {
                                $rootScope.user.profileImg = response.data.files[0].extra.Location;
                                $scope.save();
                            }
                        }, function (err) {
                            $ionicPopup.alert({
                                title: 'שגיאה',
                                template: 'שליחת התמונה נכשלה'
                            });
                        }, function (progress) {
                        });

                }
            }, function (error) {
                $ionicPopup.alert({
                    title: 'שגיאה',
                    template: error
                });
            });
    }
});

appControllers.controller('SearchCabsCtrl', function ($scope, $ionicPopup) {
    $scope.items = [];
    for (var i = 0; i < 50; i++) {
        var toPush = {
            title: i + 1,
            img: 'img/logo.png'
        };
        $scope.items.push(toPush);
    }
});