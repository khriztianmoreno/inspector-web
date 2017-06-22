(function ()
{
  'use strict';

  angular
    .module('app.administracion')
    .controller('WarningEditDialogController', WarningEditDialogController);

  /** @ngInject */
  function WarningEditDialogController($mdDialog, $state, Warning, Class,
    isEditable, WarningCenterService, Documents, Auth)
  {
    var vm = this;

    // Data
    vm.warning = Warning;
    vm.isEditable = isEditable;
    vm.classVehicle = Class;
    vm.documents = Documents;
    vm.colorPickerOptions ={
      required: true,
      format: 'hex',
      case: 'upper'
    };

    // Methods
    vm.closeDialog = closeDialog;
    vm.saveAlert = saveAlert;
    vm.getCurrentUser = Auth.getCurrentUser();


    //////////
    init();

    /**
    * Init controller
    */
    function init() {
      if (Warning) {
        vm.title = "Editar alerta";
      }else {
        vm.title = "Agregar alerta";
      }
    }

    /**
    * Save the Alert
    */
    function saveAlert() {
      closeDialog();

      vm.warning.vehicleClass = vm.classSelected;
      vm.warning.type = vm.typeSelected;
      if (vm.warning.type === 'DOCUMENT') {
        vm.warning.name = vm.documentSelected;
      }
      vm.warning.customer = vm.getCurrentUser.customer;

      //Guardar o crear
      if (vm.warning._id) {
        //vm.warning.updatedAt = new Date();
        WarningCenterService.update(vm.warning).then(function (resp) {
          if (resp._id) {
            showMessageOk();
          }else{
            showMessageError();
          }
        });
      }else {
        WarningCenterService.save(vm.warning).then(function (resp) {
          if (resp._id) {
            showMessageOk();
          }else{
            showMessageError();
          }
        });
      }
    }

    /**
    * Alert Customer Ok Dialog
    */
    function showMessageOk() {
      var alert = $mdDialog.alert()
      .title('Alerta guardada')
      .htmlContent('La alerta ha sido guardada de forma correcta.')
      .ariaLabel('save alert')
      .ok('OK');

      $mdDialog.show(alert);
      $state.reload();
    }

    /**
    * Alert Customer Error Dialog
    */
    function showMessageError() {
      var alert = $mdDialog.alert()
      .title('Error')
      .htmlContent('No se pudo guardar la alerta en este momento.')
      .ariaLabel('error alert')
      .ok('Ok');

      $mdDialog.show(alert);
    }

    /**
    * Close dialog
    */
    function closeDialog()
    {
      $mdDialog.hide();
    }
  }
})();
