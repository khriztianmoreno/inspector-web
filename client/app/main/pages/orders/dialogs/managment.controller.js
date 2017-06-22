(function () {
  'use strict';

  angular
    .module('app.orders')
    .controller('ManagmentOrderController', ManagmentOrderController);

  /** @ngInject */
  function ManagmentOrderController($state, $mdDialog, Order, OrdersService, Auth) {
    var vm = this;

    // Data
    vm.order = Order;
    vm.status = ['ACCEPTED','PENDING','CANCELED'];
    vm.currentUser = Auth.getCurrentUser();

    // Methods
    vm.closeDialog = closeDialog;
    vm.updateOrder = updateOrder;

    /**
     * Update Order
     */
    function updateOrder(){
      vm.order.status = vm.selectedStatus;
      
      OrdersService.update(vm.order).then(function(res){
        if(res._id){
          vm.order = res;
        }
        closeDialog();
      })
    }

    /**
     * Close dialog
     */
    function closeDialog() {
      $mdDialog.hide();
    }


  }
})();
