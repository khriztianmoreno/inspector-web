(function() {
  'use strict';

  angular
    .module('app.user.forgot-password')
    .controller('ForgotPasswordController', ForgotPasswordController);

  /** @ngInject */
  function ForgotPasswordController(Auth) {
    var vm = this;

    // Data
    vm.showForm = true;
    vm.showNotFoundEmail = false;

    // Methods
    vm.forgotPassword = forgotPassword;

    //////////

    /**
     * 
     */
    function forgotPassword() {
      vm.showForm = true;
      vm.showNotFoundEmail = false;
      
      Auth.forgotPassword({ email: vm.email }).then(function(resp){
        if (resp._id) {
          vm.showForm = false;
        }else{
          vm.showNotFoundEmail = true;
        }
      })
    }
  }
})();
