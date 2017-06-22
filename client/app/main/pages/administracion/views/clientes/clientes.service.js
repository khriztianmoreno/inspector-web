(function() {
  'use strict';

  angular
    .module('app.administracion')
    .factory('CustomerService', ['$q', '$http', 'ApiEndpoint', CustomerService ]);

  function CustomerService($q, $http, ApiEndpoint) {
    return {
      renameType  : renameCustomerTypeName,
      my          : myCustomers,
      filter      : filterMyCustomers,
      update      : updateCustomer,
      save        : saveCustomer,
      distributors: getDistributors,
      customerTypes: customerTypes,
      findById      : findById
    };

    function findById(id) {
      var deferred = $q.defer();

      $http
        .get(ApiEndpoint.customers.uri + '/' + id)
        .success(function(data, status) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          deferred.resolve(data);
        });

      return deferred.promise;
    }

    function renameCustomerTypeName(type) {
      var customerType = {
        '0': function(){
          return 'ADMNISTRADOR';
        },
        '1':function(){
          return 'EMPRESA';
        },
        '2':function(){
          return 'SEDE';
        },
        '3':function(){
          return 'FLOTA';
        },
        '4':function(){
          return 'CLIENTE';
        },
        '5':function(){
          return 'PROVEDOR';
        }
      };

      return customerType[type.id]();
    }

    function customerTypes() {
      var deferred = $q.defer();
      var url = ApiEndpoint.systemvalues.uri + '/customerTypes';
      $http
        .get(url)
        .success(function(data, status) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          deferred.resolve(data);
        });

      return deferred.promise;
    }

    function myCustomers(query) {
      var deferred = $q.defer();
      var url = ApiEndpoint.customers.uri +
                ApiEndpoint.customers.my + '/' +
                query.type + '/' + query.localId;
      $http
        .get(url)
        .success(function(data, status) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          deferred.resolve(data);
        });

      return deferred.promise;

    }

    function filterMyCustomers(query) {
      var deferred = $q.defer();
      var url = ApiEndpoint.customers.uri +
                ApiEndpoint.customers.filter + '/' + query.type;
      $http
        .get(url)
        .success(function(data, status) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          deferred.resolve(data);
        });

      return deferred.promise;
    }

    function updateCustomer(data) {
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

    function saveCustomer(data) {
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

    function getDistributors() {
      var deferred = $q.defer();
      var url = ApiEndpoint.customers.uri + ApiEndpoint.customers.distributors;
      $http
        .get(url)
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
