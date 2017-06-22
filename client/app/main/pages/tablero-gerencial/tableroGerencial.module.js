(function() {
  'use strict';

  angular
    .module('app.pages.tablero', ['chart.js'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, msApiProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state('app.tablero', {
      url: '/pages/tablero-gerencial',
      views: {
        'content@app': {
          templateUrl: 'app/main/pages/tablero-gerencial/tablero-gerencial.html',
          controller: 'TableroGerencialController as vm'
        }
      },
      resolve: {
        DashBoard:function($http, ApiEndpoint, Auth) {
          return $http.get(ApiEndpoint.reviews.uri + ApiEndpoint.reviews.dashboard);
        },
        TotalByDays: function($http, ApiEndpoint) {
          return $http.get(ApiEndpoint.reviews.uri + ApiEndpoint.reviews.totalBydays);
        },
        TableroData: function(msApi) {
          return msApi.resolve('tablero@get');
        }
      },
      bodyClass: 'tablero-gerencial'
    });

    // Api
    msApiProvider.register('tablero', ['app/data/tablero-gerencial/data.json']);

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pages/tablero-gerencial');

  }

})();
