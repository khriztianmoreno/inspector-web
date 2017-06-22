(function(){
  'use strict';

  angular
    .module('app.inspections')
    .factory('ReviewService', ReviewService);

  function ReviewService($q, $http, ApiEndpoint, $window) {
    return {
      find : findVehicle,
      getLocalVehicle: getLocalVehicle,
      setLocalVehicle: setLocalVehicle,
      deleteLocalVehicle: deleteLocalVehicle,
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

    function setLocalVehicle(data) {
      $window.localStorage && $window.localStorage.setItem('mobi-vehicle', JSON.stringify(data));
    }

    function getLocalVehicle() {
      return $window.localStorage && $window.localStorage.getItem('mobi-vehicle');
    }

    function deleteLocalVehicle(token) {
      $window.localStorage.removeItem(token);
    }

    function findVehicle(plate) {
      return true;
    }

  };

})();
