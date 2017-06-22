(function() {
  'use strict';

  angular
    .module('app.administracion')
    .factory('WarningCenterService', ['$q', '$http', 'ApiEndpoint', WarningCenterService ]);

  function WarningCenterService($q, $http, ApiEndpoint) {
    return {
      update      : updateWarning,
      save        : saveWarning
    };

    function updateWarning(data) {
      var deferred = $q.defer();
      var url = ApiEndpoint.warningCenter.uri + '/' + data._id;

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

    function saveWarning(data) {
      var deferred = $q.defer();

      $http
        .post(ApiEndpoint.warningCenter.uri, data)
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
