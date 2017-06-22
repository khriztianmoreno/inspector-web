(function() {
  'use strict';

  angular
    .module('app.user.reset-password')
    .controller('ResetPasswordController', ResetPasswordController);

  /** @ngInject */
  function ResetPasswordController(TokenValidate, Auth, $stateParams, $state) {
    var vm = this;

    // Data
    vm.tokenValidate = TokenValidate.data;
    vm.token = $stateParams.token;
    vm.form = {};
    vm.showForm = true;


    // Methods
    vm.resetPassword = resetPassword;

    init();

    //////////

    function init() {
      if (vm.tokenValidate === '') {
        vm.showForm = false;
      } else {
        vm.showForm = true;
      }
    }

    /**
     * 
     */
    function resetPassword() {
      Auth
        .resetPassword({ 
          email: vm.form.email, 
          password: vm.form.password,
          token: vm.token
        })
        .then(function(resp){
          debugger
          if (resp._id) {
            //Login
            Auth.login({
              email: resp.email,
              password: vm.form.password
            })
            .then(function(resp) {
              if (resp.role === 'tecnico') {
                // Logged in, redirect to home Technical
                $state.go('app.reviews');
              }else{
                // Logged in, redirect to home
                $state.go('app.tablero');
              }
            })
            .catch(function(err) {
              vm.errors.other = err.message;
            });
          }
        });
    }
  }
})();
