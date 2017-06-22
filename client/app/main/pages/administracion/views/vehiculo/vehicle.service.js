(function() {
  'use strict';

  angular
    .module('app.administracion')
    .factory('VehicleService', ['$q', '$http', 'ApiEndpoint', VehicleService ]);

  function VehicleService($q, $http, ApiEndpoint) {
    return {
      update      : updateVehicle,
      save        : saveVehicle,
      find        : findVehicle,
      list        : listVehicles
    };

    function updateVehicle(data) {
      var deferred = $q.defer();
      var url = ApiEndpoint.vehicles.uri + '/' + data._id;

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

    function saveVehicle(data) {
      var deferred = $q.defer();

      $http
        .post(ApiEndpoint.vehicles.uri, data)
        .success(function(data, status) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          deferred.resolve(data);
        });

      return deferred.promise;

    }

    function listVehicles(data){
      var deferred = $q.defer();
      var url = ApiEndpoint.vehicles.uri + '/' +data.page + '/' + data.limit;

      $http
        .get(url)
        .success(function(data, status) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          console.error('Repos error', status, data);
        });

      return deferred.promise;
    }

    function findVehicle(plate) {
      var deferred = $q.defer();
      var url = ApiEndpoint.vehicles.uri + ApiEndpoint.vehicles.plate + plate;
      $http
        .get(url)
        .success(function(data, status) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          console.error('Repos error', status, data);
        });

      return deferred.promise;
    }
  }

})();
