// Ionic app
var app = angular.module('app', [
    'ionic',
    'ionic.service.core',
    'pascalprecht.translate',
    'ngMessages',
    'ngCordova',

    'appControllers',
    'appServices',
    'appDirectives'
]);

app.run(function ($rootScope, $ionicPlatform, $ionicPopup, $state, Login) {

    Login.isLoggedIn(function (responseData) {
        if (responseData['status'] && responseData['status'] == 1) {
            var data = responseData['data'];

            if (data.ans) {
                $rootScope.user = data.user;
                $state.go('app.searchCabs');

            } else {
                $rootScope.user = false;
                if (!$state.is('login')) {
                    $state.go('login');
                }
            }
        }
        else {
            $ionicPopup.alert({
                title: 'שגיאה',
                template: responseData.msg || 'אין תשובה מהשרת'
            });
        }
    });

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }


    });
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}]);

app.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {

    $stateProvider
        // setup an abstract state for the tabs directive
        // Each tab has its own nav history stack:
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html'
        })
        .state('app.editProfile', {
            url: '/editProfile',
            templateUrl: 'templates/editProfile.html',
            controller: 'EditProfileCtrl'
        })
        .state('app.searchCabs', {
            url: '/searchCabs',
            templateUrl: 'templates/searchCabs.html',
            controller: 'SearchCabsCtrl'
        })
        .state('login', {
            url: '/login',
            controller: 'LoginCtrl',
            templateUrl: 'templates/login.html'
        })
        .state('signup', {
            url: '/signup',
            controller: 'SignupCtrl',
            templateUrl: 'templates/signup.html'
        })
    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

    $translateProvider.translations('he_IL', {
        'LOGIN_TITLE': 'התחברות',
        'SIGNUP_TITLE': 'הרשמה',
        'EDITPROFILE_TITLE': 'עריכת פרופיל',

        'SAVE': 'שמור',
        'USERNAME': 'שם משתמש',
        'PASSWORD': 'סיסמא',
        'LOGIN': 'התחבר',
        'SIGNUP': 'הירשם',
        'LOGIN_FACEBOOK': 'התחבר באמצעות פייסבוק',
        'LOGIN_GOOGLE': 'התחבר באמצעות גוגל',
        'SIGNUP_MSG': 'הזן מספר פרטים והתחל לשלם למוניות מהפלאפון',
        'MAIL': 'כתובת מייל',
        'FULLNAME': 'שם מלא',
        'PHONE': 'מספר פלאפון',
        'COUNTRY': 'מדינה',
        'CITY': 'עיר',
        'BIRTH_YEAR': 'שנת לידה',

        'CHANGE_PICTURE': 'החלף תמונה',
        'FORM_MSG.REQUIRED': 'שדה חובה',
        'FORM_MSG.MINLENGTH': 'חייב להכיל לפחות {{value}} תווים',
        'FORM_MSG.EMAIL': 'כתובת אימייל לא חוקית',

        'MENU.SEARCH_CABS': 'חפש מוניות',
        'MENU.STATS': 'סטטיסטיקות',
        'MENU.PAYMENT': 'הגדרת אמצעי תשלום',
        'MENU.EDIT_PROFILE': 'עריכת פרופיל',
        'MENU.LOGOUT': 'התנתק'


    });

    $translateProvider.preferredLanguage('he_IL');
});


var appControllers = angular.module('appControllers', []);
var appServices = angular.module('appServices', ['ngResource']);
var appDirectives = angular.module('appDirectives', []);