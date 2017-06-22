(function() {
    'use strict';

    angular
        .module('app.pages.flota')
        .controller('MiFlotaController', MiFlotaController);

    /** @ngInject */
    function MiFlotaController(Auth, $state, $mdSidenav, WidgetsBoard, Vehicles) {
        var vm = this;

        // Data
        vm.getCurrentUser = Auth.getCurrentUser();
        vm.widgets = WidgetsBoard.data;
        vm.vehicles = Vehicles.data.docs;
        
        vm.dtOptions = {
            dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth: false,
            responsive: true,
            language : {
                url : '//cdn.datatables.net/plug-ins/1.10.13/i18n/Spanish.json',
            }
        };
        vm.monthNames = monthNames;
        vm.goToDetailVehicle = goToDetailVehicle;

        function monthNames(){
            var _monthNames = [
                "Enero", 
                "Febrero", 
                "Marzo", 
                "Abril", 
                "Mayo", 
                "Junio",
                "Julio", 
                "Agosto", 
                "Septiembre", 
                "Octubre", 
                "Noviembre", 
                "Deciembre"
            ];
            
            var d = new Date();

            return _monthNames[d.getMonth()];
        }

        function goToDetailVehicle(id){
            $state.go('app.administracion.vehiculos.detail', { id: id });
        }
    }

})();