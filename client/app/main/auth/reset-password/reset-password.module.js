(function() {
  'use strict';

  angular
    .module('app.user.reset-password', ['ngPassword'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state('app.pages_user_reset-password', {
      url: '/reset/:token',
      views: {
        'main@': {
          templateUrl: 'app/core/layouts/content-only.html',
          controller: 'MainController as vm'
        },
        'content@app.pages_user_reset-password': {
          templateUrl: 'app/main/auth/reset-password/reset-password.html',
          controller: 'ResetPasswordController as vm'
        }
      },
      resolve: {
        TokenValidate: function($http, ApiEndpoint, $stateParams) {
          return $http.get(ApiEndpoint.users.uri + ApiEndpoint.users.tokenReset +'/' + $stateParams.token);
        }
      },
      bodyClass: 'reset-password'
    });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/auth/reset-password');
  }

})();
