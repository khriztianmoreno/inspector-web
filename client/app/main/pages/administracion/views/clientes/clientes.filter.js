(function() {
  'use strict';

  angular
    .module('app.core')
    .filter('renameCustomer', renameCustomer);

  /** @ngInject */
  function renameCustomer() {
    return function(customerName) {
      var customerType = {
        'ROOT': function(){
          return 'ADMINISTRADOR';
        },
        'CHANNEL': function(){
          return 'EMPRESA';
        },
        'DISTRIBUTOR': function(){
          return 'SEDE';
        },
        'CLIENT': function(){
          return 'FLOTA';
        },
        'PROVIDER': function(){
          return 'PROVEDOR';
        }
      };

      if (customerName) {
        return customerType[customerName]();
      }else{
        return null;
      }

    };
  }

})();
