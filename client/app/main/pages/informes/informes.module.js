(function() {
  'use strict';

  angular
    .module('app.pages.informes', ['ui.grid', 'ui.grid.exporter'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.informes', {
        url: '/pages/informes',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/informes/informes.html',
            controller: 'InformesController as vm'
          }
        },
        resolve: {
          Distributors: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.customers.uri + ApiEndpoint.customers.distributors);
          },
          Technicals: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.users.uri + ApiEndpoint.users.findUsers + 'tecnico');
          }
        }
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pages/informes');

  }
})();
