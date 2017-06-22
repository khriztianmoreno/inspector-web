(function() {
  'use strict';

  angular
    .module('app.administracion')
    .factory('TrackingService', ['$q', '$http', 'ApiEndpoint', TrackingService]);

  function TrackingService($q, $http, ApiEndpoint) {
    return {
      update      : updateCard,
      save        : saveCard,
      list        : listCard,
      addAlert    : addAlert,
    };

    function addAlert(reviewId) {
      var url = ApiEndpoint.trackings.uri + '/alert/' + reviewId;
      var source = {
        name: 'MOBI BUSINESS',
        id: '0000',
      };
      var color = '#FB8C00';
      var reqData = JSON.stringify({ source: source, color: color });

      return $http.post(url, reqData);
    }

    function updateCard(data) {
      var deferred = $q.defer();
      var url = ApiEndpoint.trackings.uri + '/' + data._id;

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

    function saveCard(data) {
      var deferred = $q.defer();

      $http
        .post(ApiEndpoint.trackings.uri, data)
        .success(function(data, status) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          deferred.resolve(data);
        });

      return deferred.promise;

    }

    function listCard(data){
      var deferred = $q.defer();
      var url = ApiEndpoint.trackings.uri;

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
