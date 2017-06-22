(function() {
  'use strict';

  angular
    .module('app.administracion')
    .factory('PromotionService', ['$q', '$http', 'ApiEndpoint', PromotionService ]);

  function PromotionService($q, $http, ApiEndpoint) {
    return {
      update: updatePromotion,
      save: savePromotion,
      countries: getCountries,
      myServices: myServices,
    };

    function getCountries(){
      var deferred = $q.defer();
      var url = 'https://restcountries.eu/rest/v1/all';

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

    function updatePromotion(data) {
      var deferred = $q.defer();
      var url = ApiEndpoint.promotions.uri + '/' + data._id;

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

    function savePromotion(data) {
      var deferred = $q.defer();

      $http
        .post(ApiEndpoint.promotions.uri, data)
        .success(function(data, status) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          deferred.resolve(data);
        });

      return deferred.promise;

    }

    function myServices(id) {
      var deferred = $q.defer();
      var url = ApiEndpoint.customers.uri + ApiEndpoint.customers.myServices + '/' + id;

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
