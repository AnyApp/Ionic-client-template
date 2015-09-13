var urlBase = 'https://eitan-orhemi.c9.io';

appServices.factory('Login', ['$resource',
    function($resource){

      return $resource('url', null, {
          facebook: {url:urlBase + '/auth/facebook', method:'GET'},
          google: {url:urlBase + '/auth/google', method:'GET'},
          login: {url:urlBase + '/auth/login', method:'POST'},
          logout: {url:urlBase + '/auth/logout', method:'GET'},
          isLoggedIn: {url:urlBase + '/auth/isLoggedIn', method:'GET'}
      });
    }]
);

appServices.factory('User', ['$resource',
        function($resource){
            return $resource(urlBase+ '/user/:userId', {userId:'@id'});
        }]
);