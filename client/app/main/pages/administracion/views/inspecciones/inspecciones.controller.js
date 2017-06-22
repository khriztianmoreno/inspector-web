(function() {
    'use strict';

    angular
        .module('app.administracion')
        .controller('AdminInspeccionesController', AdminInspeccionesController);

    /** @ngInject */

    function AdminInspeccionesController($document, $mdDialog, $mdSidenav, $rootScope, $state, InspectionData, InspeccionesService) {
        var vm = this;
        vm.inspectionData = InspectionData.data;
        // Methods

        init();
        //////////

        /**
         * Initialize the controller
         */
        function init() {
            
        }

        vm.createInspecion = function() {
            $state.go('app.administracion.inspecciones.create');
        };

        vm.editInspecion = function(inspection) {
            $state.go('app.administracion.inspecciones.detail', { id: inspection._id });
        };


    }
})();
