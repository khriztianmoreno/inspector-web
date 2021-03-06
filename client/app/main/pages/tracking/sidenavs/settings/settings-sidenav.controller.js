(function ()
{
    'use strict';

    angular
        .module('app.pages.tracking')
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
