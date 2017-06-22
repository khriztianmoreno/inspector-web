'use strict';

(function () {

  angular
    .module('inspector.login')
    .factory('authInterceptor', authInterceptor);

  function authInterceptor($rootScope, $q, $cookies, $injector, Util) {
    var state;
    return {
      // Add authorization token to headers
      request: function request(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },


      // Intercept 401s and redirect you to login
      responseError: function responseError(response) {
        switch (response.status) {
          case 401: {
            (state || (state = $injector.get('$state'))).go('app.user_login');
            // remove any stale tokens
            $cookies.remove('token');
            break;
          }
          case 403: {
            (state || (state = $injector.get('$state'))).go('app.pages_errors_error-403');
            break;
          }
          case 500: {
            (state || (state = $injector.get('$state'))).go('app.pages_errors_error-500');
            break;
          }
          default:
            console.log("Response Status ", response);
        }
        return $q.reject(response);
      }
    };
  }

})();
