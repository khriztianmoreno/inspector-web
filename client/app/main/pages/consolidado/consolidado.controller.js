(function ()
{
    'use strict';

    angular
        .module('app.pages.consolidado')
        .controller('ConsolidadoController', ConsolidadoController);

    /** @ngInject */
    function ConsolidadoController(Reviews, $state)
    {
        var vm = this;

        // Data
        vm.reviews = Reviews.data;

        vm.dtOptions = {
            dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth : false,
            responsive: true,
            language : {
                url : '//cdn.datatables.net/plug-ins/1.10.13/i18n/Spanish.json',
            }
        };

        // Methods
        vm.gotoDetail = gotoDetail;

        //////////

        /**
         * Go to review detail
         *
         * @param id
         */
        function gotoDetail(id) {
          $state.go('app.consolidado.detalle', { id: id });
        }
    }
})();
