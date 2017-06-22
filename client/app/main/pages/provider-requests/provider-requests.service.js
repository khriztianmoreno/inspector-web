(function(){
  'use strict';

  angular
    .module('app.pages.provider-requests')
    .factory('RequestProvidersService', RequestProvidersService);

  function RequestProvidersService($q, $http, ApiEndpoint, $window) {
    return {
      save: saveReview
    };

    function saveReview(data) {
      var deferred = $q.defer();

      $http
        .post(ApiEndpoint.reviews.uri, data)
        .success(function(data, status) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          deferred.resolve(data);
        });

      return deferred.promise;
    }

  };

})();
