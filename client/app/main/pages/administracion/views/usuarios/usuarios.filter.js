(function() {
  'use strict';

  angular
    .module('app.core')
    .filter('renameUsers', renameUsers);

  /** @ngInject */
  function renameUsers() {
    return function(userName) {
      var userRole = {
        'admin': function(){
          return 'ADMINISTRADOR';
        },
        'cda':function(){
          return 'EMPRESA';
        },
        'sede':function(){
          return 'SEDE';
        },
        'flota':function(){
          return 'FLOTA';
        },
        'tecnico':function(){
          return 'TÉCNICO';
        },
        'tecnico flota':function(){
          return 'TÉCNICO FLOTA';
        },
        'mobi-app': function(){
          return 'USUARIOS MOBI APP'
        },
        'country Manager': function(){
          return 'COUNTRY MANAGER';
        }
      };

      if (userName) {
        return userRole[userName]();
      }else{
        return null;
      }

    };
  }

})();
