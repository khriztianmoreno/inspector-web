(function ()
{
    'use strict';

    angular
        .module('app.administracion')
        .controller('CategoryDialogController', CategoryDialogController);

    /** @ngInject */
    function CategoryDialogController($mdDialog, $document)
    {
        var vm = this;

        // Data
        vm.title = 'Agregar una categoría';
        vm.category= {}
        vm.options ={
          required: true,
          format:'hex',
          inline: true
        }

        // Methods
        vm.closeDialog = closeDialog;
        vm.saveCategory = saveCategory;


        //////////

        function saveCategory() {
          debugger
          console.log(vm.category);
          closeDialog();
        }

        /**
         * Close dialog
         */
        function closeDialog()
        {
          debugger
          $mdDialog.hide();
        }
    }
})();
