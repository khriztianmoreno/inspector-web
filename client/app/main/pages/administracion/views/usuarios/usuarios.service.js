(function() {
  'use strict';

  angular
    .module('app.administracion')
    .factory('UsuarioService', ['$q', '$http', 'ApiEndpoint', UsuarioService ]);

  function UsuarioService($q, $http, ApiEndpoint) {
    return {
      update      : updateUser,
      save        : saveUser
    };

    function updateUser(data) {
      var deferred = $q.defer();
      var url = ApiEndpoint.users.uri + '/' + data._id;

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

    function saveUser(data) {
      var deferred = $q.defer();

      $http
        .post(ApiEndpoint.users.uri, data)
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
