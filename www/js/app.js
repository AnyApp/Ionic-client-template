// Ionic app
var app = angular.module('app', [
    'ionic',
    'ionic.service.core',
    'pascalprecht.translate',
    'ngMessages',

    'appControllers',
    'appServices',
    'appDirectives'
]);

app.run(function ($rootScope, $ionicPlatform) {

    $rootScope.user = false;

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

app.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {

    $stateProvider
        // setup an abstract state for the tabs directive
        // Each tab has its own nav history stack:
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
        .state('', {
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
        'USERNAME': 'שם משתמש',
        'PASSWORD': 'סיסמא',
        'LOGIN': 'התחבר',
        'SIGNUP': 'הירשם',
        'LOGIN_FACEBOOK': 'התחבר באמצעות פייסבוק',
        'LOGIN_GOOGLE': 'התחבר באמצעות גוגל',
        'SIGNUP_MSG': 'הזן מספר פרטים והתחל לשלם למוניות מהפלאפון',
        'MAIL': 'כתובת מייל',
        'FULLNAME': 'שם מלא',
        'FORM_MSG.REQUIRED': 'שדה חובה',
        'FORM_MSG.MINLENGTH': 'חייב להכיל לפחות {{value}} תווים',
        'FORM_MSG.EMAIL': 'כתובת אימייל לא חוקית'
    });

    $translateProvider.preferredLanguage('he_IL');
});


var appControllers = angular.module('appControllers', []);
var appServices = angular.module('appServices', ['ngResource']);
var appDirectives = angular.module('appDirectives', []);