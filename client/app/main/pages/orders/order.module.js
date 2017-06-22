(function() {
  'use strict';

  angular
    .module('app.orders', ['scrollable-table'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.orders', {
        url: '/pages/orders',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/orders/orders.html',
            controller: 'OrdersController as vm'
          }
        },
        resolve: {
          Orders: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.orders.uri);
          },
        }
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pages/orders');

  }
})();
