appControllers.controller('AppCtrl', function ($rootScope, $scope, $ionicSideMenuDelegate) {

});


appControllers.controller('MenuCtrl', function ($rootScope, $scope, $state, Login) {
    $scope.logout = function () {
        Login.logout(function (responseData) {
            $state.go('login');
        });
    };
});

appControllers.controller('LoginCtrl', function ($rootScope, $scope, $ionicPopup, $state, $localStorage, Login) {
    $scope.credentials = {};

    $scope.login = function () {
        Login.login($scope.credentials, function (responseData) {

            if (responseData['status'] && responseData['status'] == 1) {
                var data = responseData['data'];
                $rootScope.user = data.user;
                //$localStorage.set('sails.sid', data.sid);
                $state.go('app.editProfile');
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
        Login.facebook({}, function (responseData) {

            if (responseData['status'] && responseData['status'] == 1) {
                var data = responseData['data'];
                $rootScope.user = data.user;
                $cookieStore.put('sails.sid', data.sid);
                $state.go('app.editProfile');
            }
            else {
                $ionicPopup.alert({
                    title: 'שגיאה',
                    template: responseData.msg || 'אין תשובה מהשרת'
                });
            }
        });
    };

    $scope.googleLogin = function () {
        Login.google({}, function (responseData) {
            if (responseData['status'] && responseData['status'] == 1) {
                var data = responseData['data'];
                $rootScope.user = data.user;
                $cookieStore.put('sails.sid', data.sid);
                $state.go('app.editProfile');
            }
            else {
                $ionicPopup.alert({
                    title: 'שגיאה',
                    template: responseData.msg || 'אין תשובה מהשרת'
                });
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

appControllers.controller('EditProfileCtrl', function ($rootScope, $scope, $cordovaImagePicker, $cordovaFileTransfer, $ionicPopup, User, File) {
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
            console.log(responseData);
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
                    $scope.user.profileImg = results[i];
                    $cordovaFileTransfer.upload(server, results[i], {})
                        .then(function (result) {
                            var response = JSON.parse(result.response);

                            if (response.data && response.data.files.length > 0) {
                                $scope.user.profileImg = response.data.files[0].extra.Location;
                                $scope.save();
                            }
                        }, function (err) {
                            console.log(err);
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
