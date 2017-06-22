(function ()
{
    'use strict';

    /** @ngInject */
    function IndexController(fuseTheming, $cookies) {
        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;

        //Floating menu
        vm.isOpen = false;
        vm.mode = ['md-fling', 'md-scale'];
        vm.openTo = 'right';
        /*if (!$cookies.get('token')) {
          vm.showInfoBar = false;
          vm.floatMenu = false;
        }else{
          vm.floatMenu = true;
        }*/
    }

    angular
        .module('inspector')
        .controller('IndexController', IndexController);
})();
