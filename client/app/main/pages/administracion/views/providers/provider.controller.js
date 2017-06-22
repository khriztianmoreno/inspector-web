(function () {

  'use strict';

    angular
        .module('app.administracion')
        .controller('ProviderController', ProviderController);

    function ProviderController($state, Providers){
      var vm = this;

      // Data
      vm.providers = Providers.data;

      // Methods
      vm.gotoCreateProvider = gotoCreateProvider;
      vm.goToDetail = goToDetail;

      function gotoCreateProvider(){
         $state.go('app.administracion.providers.create');
      }

      function goToDetail(id){
        $state.go('app.administracion.providers.edit', { id: id });
      }

    }

})();


