(function () {
  'use strict';

  angular
    .module('app.orders')
    .controller('OrdersController', OrdersController);

  /** @ngInject */
  function OrdersController($state, $mdDialog, $document, Orders) {
    var vm = this;

    // Data
    vm.orders = Orders.data;


    // Methods
    vm.managmentOrder = managmentOrder;

    function managmentOrder(ev, order) {
      $mdDialog.show({
        controller: 'ManagmentOrderController',
        controllerAs: 'vm',
        templateUrl: 'app/main/pages/orders/dialogs/managment.html',
        parent: angular.element($document.find('#content-container')),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          Order: order,
        }
      });
    }


  }
})();
