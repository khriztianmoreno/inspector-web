(function () {
  'use strict';

  angular
    .module('app.administracion')
    .controller('ServiceDialogController', ServiceDialogController);

  /** @ngInject */
  function ServiceDialogController($mdDialog, ServiceDetail, ServicesList, Types, ProviderService, Headquarter) {
    var vm = this;
    
    // Data
    vm.service = angular.copy(ServiceDetail);
    vm.services = ServicesList;
    vm.serviceType = Types;
    vm.newService = false;


    if (!vm.service) {
      vm.newService = true;
    }

    // Methods
    vm.closeDialog = closeDialog;
    vm.addService = addService;
    vm.updateService = updateService;

    //////////

    /**
     * Delete Contact Confirm Dialog
     */
    function deleteContactConfirm(ev) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure want to delete the contact?')
        .htmlContent('<b>' + vm.contact.name + ' ' + vm.contact.lastName + '</b>' + ' will be deleted.')
        .ariaLabel('delete contact')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function () {

        vm.contacts.splice(vm.contacts.indexOf(Contact), 1);

      });
    }

    function addService(){
      Headquarter.services.unshift(vm.service);

      ProviderService.update(Headquarter).then(function(res){
        vm.services = res.services;
        closeDialog();
      })
    }

    function updateService(){
      var index = _.findIndex(Headquarter.services, { _id: vm.service._id });
      Headquarter.services[index] = vm.service;
      
      ProviderService.update(Headquarter).then(function(res){
        vm.services = res.services;
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
