(function() {
  'use strict';

  angular
    .module('app.pages.provider-requests', ['datatables'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.requests_providers', {
        url: '/pages/request-providers',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/provider-requests/provider-requests.html',
            controller: 'ProviderRequestsController as vm'
          }
        },
        resolve: {
          MyRequests: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.requestProviders.uri);
          },
        }
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pages/provider-requests');

  }
})();
