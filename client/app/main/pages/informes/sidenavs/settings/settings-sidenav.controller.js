(function ()
{
    'use strict';

    angular
        .module('app.pages.informes')
        .controller('SettingsSidenavController', SettingsSidenavController);

    /** @ngInject */
    function SettingsSidenavController($mdColorPalette, BoardService)
    {
        var vm = this;

        // Data
        vm.board = BoardService.data;
        vm.palettes = $mdColorPalette;
        vm.selectedMenu = 'Settings';

        // Methods

        ////////

    }
})();
