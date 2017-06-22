(function () {
  'use strict';

  angular
    .module('app.administracion')
    .controller('PromotionAddController', PromotionAddController);

  /** @ngInject */
  function PromotionAddController($mdDialog, $state, Auth, Countries, PromotionService, Categories) {
    var vm = this;

    // Data
    vm.currentUser = Auth.getCurrentUser;
    vm.countries = Countries.data;

    // Methods
    vm.gotoProducts = gotoPromotion;
    vm.savePromotion = savePromotion;

    //////////

    init();

    /**
     * Initialize
     */
    function init() {
      vm.categories = Categories.data[0].values;
      if(vm.currentUser().role === 'country Manager'){
        vm.categories.unshift('REGIONAL');
      } else{
        var user = vm.currentUser();
        PromotionService.myServices(user.customer.localId).then(function(res){
          vm.headquarters = res;
        })
      }

    }

    /**
     * Go to gotoPromotion page
     */
    function gotoPromotion() {
      $state.go('app.administracion.promotions');
    }

    function savePromotion(){
      var user = vm.currentUser();
      console.info('user', user);

      if(user.role === 'country Manager'){
        vm.promotion.owner = {
          channelId: user.customer.localId,
          channelName: user.customer.localName,
          localId: user.customer.localId,
          localName: user.customer.localName,
        };
        vm.promotion.service = null;
        vm.promotion.category = vm.selectedCategory;
        vm.promotion.country = vm.selectedCountry.alpha2Code;
      } else {
        vm.promotion.owner = {
          channelId: user.customer.channelId,
          channelName: user.customer.channelName,
          distributorId: user.customer.localId,
          distributorName: user.customer.localName,
          localId: vm.selectedHeadquarter._id,
          localName: vm.selectedHeadquarter.name,
        };

        vm.promotion.service = {
          id: vm.selectedService._id,
          name: vm.selectedService.name,
        };
        
        vm.promotion.category = vm.selectedService.type;
        vm.promotion.loc = vm.selectedHeadquarter.loc;
      }

      console.info('promotion', vm.promotion);
      
      PromotionService.save(vm.promotion).then(function(res){
        if(res._id){
          showMessageOk({
            title: 'Promoción guardada',
            msj: 'La promoción fue creada de forma correcta.'
          });
        } else{
          showMessageError();
        }
      })
    }

    /**
     * Alert Customer Ok Dialog
     */
    function showMessageOk(info) {
      var alert = $mdDialog.alert()
        .title(info.tilte)
        .htmlContent(info.msj)
        .ariaLabel('save promotion')
        .ok('OK');

      $mdDialog.show(alert);
    }

    /**
     * Alert Customer Error Dialog
     */
    function showMessageError(error) {
      var alert = $mdDialog.alert()
        .title('Error')
        .htmlContent('No se pudo completar la tarea.')
        .ariaLabel('error promotion')
        .ok('Ok');

      $mdDialog.show(alert);
    }


  }
})();
