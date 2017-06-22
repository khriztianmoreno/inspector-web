(function () {
  'use strict';

  angular
    .module('app.administracion')
    .controller('WarningCenterController', WarningCenterController);

  /** @ngInject */
  function WarningCenterController($state, $mdDialog, $document, Warnings,
    Classes, Documents, Auth) {
    var vm = this;

    // Data
    vm.warnings = Warnings.data;
    vm.class = Classes.data[0].values;
    vm.documents = Documents.data[0].values;
    vm.getCurrentUser = Auth.getCurrentUser();

    // Methods
    vm.editAlert = editAlert;
    vm.addAlert = addAlert;

    /**
     * Show dialog with edit information
     */
    function editAlert(ev, warning, isEditable) {
      $mdDialog.show({
          controller         : 'WarningEditDialogController',
          controllerAs       : 'vm',
          templateUrl        : 'app/main/pages/administracion/views/centro-alertas/dialogs/edit.html',
          parent             : angular.element($document.find('#content-container')),
          targetEvent        : ev,
          clickOutsideToClose: true,
          locals             : {
            Warning: warning,
            Class  : vm.class,
            Documents: vm.documents,
            isEditable: isEditable
          }
      });
    }

    function addAlert(ev) {
      $mdDialog.show({
          controller         : 'WarningEditDialogController',
          controllerAs       : 'vm',
          templateUrl        : 'app/main/pages/administracion/views/centro-alertas/dialogs/edit.html',
          parent             : angular.element($document.find('#content-container')),
          targetEvent        : ev,
          clickOutsideToClose: true,
          locals             : {
            Warning: undefined,
            Class  : vm.class,
            Documents: vm.documents,
            isEditable: true
          }
      });
    }
  }
})();
