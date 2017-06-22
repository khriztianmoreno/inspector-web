(function () {
  'use strict';

  angular
    .module('app.administracion')
    .controller('PromotionsController', PromotionsController);

  /** @ngInject */
  function PromotionsController($state, $mdDialog, $document, Auth, Promotions) {
    var vm = this;

    // Data
    vm.getCurrentUser = Auth.getCurrentUser();
    vm.promotions = Promotions.data;

    // Methods
    vm.gotoAddPromotion = gotoAddPromotion;
    vm.gotoEditPromotion = gotoEditPromotion;


    function gotoAddPromotion(){
      $state.go('app.administracion.promotions.add');
    }

    function gotoEditPromotion(id){
      $state.go('app.administracion.promotions.edit', { id: id });
    }

  }
})();
