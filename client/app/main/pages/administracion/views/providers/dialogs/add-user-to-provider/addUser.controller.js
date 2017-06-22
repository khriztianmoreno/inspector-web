(function() {
  'use strict';

  angular
    .module('app.administracion')
    .controller('AddUserToProviderDialogController', AddUserToProviderDialogController);

  /** @ngInject */
  function AddUserToProviderDialogController($mdDialog, Auth, $mdToast, $q, $state, 
    MyProvider, UsuarioService, Users) {
    var vm = this;

    vm.title = 'Nuevo Usuario';
    vm.myUsers = Users;
    vm.identificationTypes = ('NIT CC CE').split(' ').map(function(type) {
      return { value: type };
    });

    vm.saveUser = saveUser;
    vm.closeDialog = closeDialog;


    function saveUser(){
      vm.contact.role = 'provider_app';
      vm.contact.customer = {
        localName: MyProvider.channelName,
        localId: MyProvider.channelId,
        distributorName: null,
        distributorId: null,
        channelName: MyProvider.customerCreateName,
        channelId: MyProvider.customerCreateId
      };

      UsuarioService.save(vm.contact).then(function(resp){
         if (resp._id){
           Users.unshift(resp);
           showMessageOk({
              title: 'Usuario agregado',
              msj: 'El usuario fue creado correctamente.'
            });
           closeDialog();
         } else {
           showMessageError();
         }
      });

    }

    /**
     * Alert Customer Ok Dialog
     */
    function showMessageOk(info) {
      var alert = $mdDialog.alert()
        .title(info.tilte)
        .htmlContent(info.msj)
        .ariaLabel('save customer')
        .ok('OK');

      $mdDialog.show(alert);
    }

    /**
     * Alert Customer Error Dialog
     */
    function showMessageError(error) {
      var alert = $mdDialog.alert()
        .title('Error')
        .htmlContent('No se pudo completar la tarea.')
        .ariaLabel('error user create')
        .ok('Ok');

      $mdDialog.show(alert);
    }

    /**
      * Close dialog
    */
    function closeDialog(){
      $mdDialog.hide();
    }


  }
  
})();