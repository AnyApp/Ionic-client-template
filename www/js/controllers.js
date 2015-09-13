
appControllers.controller('LoginCtrl', function($rootScope, $scope, $ionicPopup, Login) {
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

appControllers.controller('SignupCtrl', function($scope, $ionicPopup, User) {
    $scope.user = {};

    $scope.signup = function () {
        console.log($scope.user);
        if (!$scope.user.username || !$scope.user.password || !$scope.user.mail || !$scope.user.fullname) {
            $ionicPopup.alert({
                title: 'שגיאה',
                template: 'נא מלא את כל השדות'
            });
        }
        else {
            User.save($scope.user, function (responseData) {
                if (!responseData.user) {
                    $ionicPopup.alert({
                        title: 'שגיאה',
                        template: responseData.message
                    });
                }
            });
        }
    }

});
