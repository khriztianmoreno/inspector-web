(function () {
  'use strict';

  angular
    .module('app.toolbar')
    .controller('ToolbarController', ToolbarController);

  /** @ngInject */
  function ToolbarController($rootScope, $q, $state, $timeout, $mdSidenav, $translate, $mdToast, msNavigationService, Auth) {
    var vm = this;

    // Data
    $rootScope.global = {
      search: ''
    };

    vm.bodyEl = angular.element('body');
    vm.userStatusOptions = [{
        'title': 'Online',
        'icon': 'icon-checkbox-marked-circle',
        'color': '#4CAF50'
      },
      {
        'title': 'Away',
        'icon': 'icon-clock',
        'color': '#FFC107'
      }, {
        'title': 'Do not Disturb',
        'icon': 'icon-minus-circle',
        'color': '#F44336'
      }, {
        'title': 'Invisible',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#BDBDBD'
      }, {
        'title': 'Offline',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#616161'
      }
    ];
    vm.languages = {
      en: {
        'title': 'English',
        'translation': 'TOOLBAR.ENGLISH',
        'code': 'en',
        'flag': 'us'
      },
      es: {
        'title': 'Spanish',
        'translation': 'TOOLBAR.SPANISH',
        'code': 'es',
        'flag': 'es'
      }
    };
    vm.getCurrentUser = Auth.getCurrentUser;

    // Methods
    vm.toggleSidenav = toggleSidenav;
    vm.logout = logout;
    vm.changeLanguage = changeLanguage;
    vm.setUserStatus = setUserStatus;
    vm.toggleHorizontalMobileMenu = toggleHorizontalMobileMenu;
    vm.toggleMsNavigationFolded = toggleMsNavigationFolded;
    vm.search = search;
    vm.searchResultClick = searchResultClick;

    //////////

    init();
    setingDirectOptions();

    /**
     * Initialize
     */
    function init() {
      // Select the first status as a default
      vm.userStatus = vm.userStatusOptions[0];

      // Get the selected language directly from angular-translate module setting
      vm.selectedLanguage = vm.languages[$translate.preferredLanguage()];
    }

    /**
     * Set direct options for roles
     */
    function setingDirectOptions() {
      switch (vm.getCurrentUser().role) {
        case 'cda':
          vm.addUser = true;
          vm.addClient = true;
          vm.addVehicle = true;
          break;
        case 'admin':
          vm.addUser = true;
          vm.addClient = true;
          vm.addVehicle = true;
          break;
        case 'sede':
          vm.addUser = true;
          vm.addClient = true;
          vm.addVehicle = true;
          break;
        case 'flota':
          vm.addUser = false;
          vm.addClient = false;
          vm.addVehicle = true;
          break;
        case 'tecnico':
          vm.addUser = false;
          vm.addClient = false;
          vm.addVehicle = true;
          break;
        case 'tecnico flota':
          vm.addUser = false;
          vm.addClient = false;
          vm.addVehicle = true;
          break;
        case 'country Manager':
          vm.addUser = false;
          vm.addClient = false;
          vm.addVehicle = false;
          vm.showIcon = false;
          break;
        case 'provider_app':
          vm.addUser = false;
          vm.addClient = false;
          vm.addVehicle = false;
          vm.showIcon = false;
          break;
        default:

      }
    }


    /**
     * Toggle sidenav
     *
     * @param sidenavId
     */
    function toggleSidenav(sidenavId) {
      $mdSidenav(sidenavId).toggle();
    }

    /**
     * Sets User Status
     * @param status
     */
    function setUserStatus(status) {
      vm.userStatus = status;
    }

    /**
     * Logout Function
     */
    function logout() {
      Auth.logout();
      $state.go('app.user_login');
    }

    /**
     * Change Language
     */
    function changeLanguage(lang) {
      vm.selectedLanguage = lang;

      // Change the language
      $translate.use(lang.code);
    }

    /**
     * Toggle horizontal mobile menu
     */
    function toggleHorizontalMobileMenu() {
      vm.bodyEl.toggleClass('ms-navigation-horizontal-mobile-menu-active');
    }

    /**
     * Toggle msNavigation folded
     */
    function toggleMsNavigationFolded() {
      msNavigationService.toggleFolded();
    }

    /**
     * Search action
     *
     * @param query
     * @returns {Promise}
     */
    function search(query) {
      var navigation = [],
        flatNavigation = msNavigationService.getFlatNavigation(),
        deferred = $q.defer();

      // Iterate through the navigation array and
      // make sure it doesn't have any groups or
      // none ui-sref items
      for (var x = 0; x < flatNavigation.length; x++) {
        if (flatNavigation[x].uisref) {
          navigation.push(flatNavigation[x]);
        }
      }

      // If there is a query, filter the navigation;
      // otherwise we will return the entire navigation
      // list. Not exactly a good thing to do but it's
      // for demo purposes.
      if (query) {
        navigation = navigation.filter(function (item) {
          if (angular.lowercase(item.title).search(angular.lowercase(query)) > -1) {
            return true;
          }
        });
      }

      // Fake service delay
      $timeout(function () {
        deferred.resolve(navigation);
      }, 1000);

      return deferred.promise;
    }

    /**
     * Search result click action
     *
     * @param item
     */
    function searchResultClick(item) {
      // If item has a link
      if (item.uisref) {
        // If there are state params,
        // use them...
        if (item.stateParams) {
          $state.go(item.state, item.stateParams);
        } else {
          $state.go(item.state);
        }
      }
    }
  }

})();
