(function() {
  'use strict';

  angular
    .module('app.administracion')
    .factory('ProviderService', ['$q', '$http', 'ApiEndpoint', ProviderService ]);

  function ProviderService($q, $http, ApiEndpoint) {
    return {
      update : updateProvider,
      save   : saveProvider,
      list   : listProviders
    };

    function updateProvider(data) {
      var deferred = $q.defer();
      var url = ApiEndpoint.customers.uri + '/' + data._id;

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

    function saveProvider(data) {
      var deferred = $q.defer();

      $http
        .post(ApiEndpoint.customers.uri, data)
        .success(function(data, status) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          deferred.resolve(data);
        });

      return deferred.promise;

    }

    function listProviders(data){
      var deferred = $q.defer();
      var url = ApiEndpoint.customers.uri;

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
