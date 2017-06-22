(function() {
  'use strict';

  angular
    .module('app.pages.consolidado', ['datatables'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.consolidado', {
        url: '/pages/consolidado',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/consolidado/consolidado.html',
            controller: 'ConsolidadoController as vm'
          }
        },
        resolve: {
          Reviews: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.reviews.uri);
          },
          DataPDF: function (msApi) {
            return msApi.resolve('data.consolidadoPDF@get');
          }
        }
      })
      .state('app.consolidado.detalle', {
        url: '/:id',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/consolidado/detalle/detalle.html',
            controller: 'ConsolidadoDetailController as vm'
          }
        },
        resolve: {
          Review: function($http, ApiEndpoint, $stateParams) {
            return $http.get(ApiEndpoint.reviews.uri + '/' + $stateParams.id);
          }
        },
        bodyClass: 'invoice printable'
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pages/consolidado');

    // Api
    msApiProvider.register('tables.employees100', ['app/data/tables/employees100.json']);
    msApiProvider.register('data.consolidadoPDF', ['app/data/db/consolidadoPdf.json']);

  }
})();
