(function() {
  'use strict';

  angular
    .module('app.administracion')
    .factory('InspectionService', ['$q', '$http', 'ApiEndpoint', InspectionService ]);

  function InspectionService($q, $http, ApiEndpoint) {
    return {
      update      : updateInspection,
      save        : saveInspection
    };

    function updateInspection(data) {
      var deferred = $q.defer();
      var url = ApiEndpoint.inspections.uri + '/' + data._id;
      
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

    function saveInspection(data) {
      var deferred = $q.defer();

      $http
        .post(ApiEndpoint.inspections.uri, data)
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
