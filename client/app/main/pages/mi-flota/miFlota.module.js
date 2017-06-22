(function() {
  'use strict';

  angular
    .module('app.pages.flota', ['datatables'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, msApiProvider,
    $translatePartialLoaderProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state('app.flota', {
      url: '/pages/mi-flota',
      views: {
        'content@app': {
          templateUrl: 'app/main/pages/mi-flota/mi-flota.html',
          controller: 'MiFlotaController as vm'
        }
      },
      resolve: {
        WidgetsBoard: function($http, ApiEndpoint) {
          return $http.get(ApiEndpoint.vehicles.uri + ApiEndpoint.vehicles.widgets);
        },
        Vehicles: function($http, ApiEndpoint) {
          return $http.get(ApiEndpoint.vehicles.uri + ApiEndpoint.vehicles.page + ApiEndpoint.vehicles.limit);
        }
      },
      bodyClass: 'mi-flota'
    });

    // Api
    msApiProvider.register('mi-flota.data', ['app/data/mi-flota/data.json']);

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pages/mi-flota');
  }

})();
