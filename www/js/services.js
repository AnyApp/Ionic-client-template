var urlBase = 'https://eitan-orhemi.c9.io';

appServices.factory('Login', ['$resource', function ($resource) {
        return $resource('url', null, {
            facebook: {url: urlBase + '/auth/facebook', method: 'GET'},
            google: {url: urlBase + '/auth/google', method: 'GET'},
            login: {url: urlBase + '/auth/login', method: 'POST'},
            logout: {url: urlBase + '/auth/logout', method: 'GET'},
            isLoggedIn: {url: urlBase + '/auth/isLoggedIn', method: 'GET'}
        });
    }]
);

appServices.factory('User', ['$resource', function ($resource) {
        return $resource(urlBase + '/user/:id', {id: '@id'});
    }]
);

appServices.factory('File', ['$resource', function ($resource) {
        return $resource('url', null, {
            upload: {url: urlBase + '/file/upload', method: 'POST'}
        });
    }]
);

appServices.factory('$localStorage', ['$window', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}]);