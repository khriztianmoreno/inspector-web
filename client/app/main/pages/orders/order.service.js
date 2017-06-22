(function() {
  'use strict';

  angular
    .module('app.orders')
    .factory('OrdersService', ['$q', '$http', 'ApiEndpoint', OrdersService ]);

  function OrdersService($q, $http, ApiEndpoint) {
    return {
      update: updateOrder,
    };

    function updateOrder(data) {
      var deferred = $q.defer();
      var url = ApiEndpoint.orders.uri + '/' + data._id;

      $http
        .put(url, data)
        .success(function(data, status) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          deferred.resolve(data);
        });

      return deferred.promise;

    }

  }

})();
