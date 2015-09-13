
appControllers.controller('LoginCtrl', function($scope, $ionicPopup, Login) {
    $scope.credentials = {};

    $scope.login = function () {
        Login.login($scope.credentials, function (responseData) {
            if (!responseData.user) {
                $ionicPopup.alert({
                    title: 'שגיאה',
                    template: responseData.message
                });
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
