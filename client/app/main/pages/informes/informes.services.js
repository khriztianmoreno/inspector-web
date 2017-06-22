(function() {
  'use strict';

  angular
    .module('app.administracion')
    .factory('InformesService', ['$q', '$http', 'ApiEndpoint', InformesService ]);

  function InformesService($q, $http, ApiEndpoint) {
    return {
      find      : findData
    };

    function findData(data) {
      var deferred = $q.defer(),
          url = ApiEndpoint.reviews.uri + ApiEndpoint.reviews.report;

      $http
        .post(url, data)
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
