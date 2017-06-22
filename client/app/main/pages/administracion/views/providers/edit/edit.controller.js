(function () {

  'use strict';

  angular
    .module('app.administracion')
    .controller('ProviderEditController', ProviderEditController);

  function ProviderEditController($scope, $state, $mdDialog, $document, MyUsers, UsuarioService,
    uiGmapGoogleMapApi, ProviderService, ServicesType, Provider, Headquarters, Auth) {
    var vm = this;

    // Data
    vm.currentTab = 0;
    vm.provider = Provider.data;
    vm.headquarters = Headquarters.data;
    vm.getCurrentUser = Auth.getCurrentUser();
    vm.serviceType = ServicesType.data[0].values;
    vm.usersProviders = MyUsers.data || [];

    //vm.headQuartersLocked = true;
    vm.edit = true;
    vm.map = {
      center: {
        latitude: 6.217,
        longitude: -75.567
      },
      zoom: 16,
      dragging: false,
      bounds: {},
      markers: [],
      events: {
        click: clickMarker
      }
    };

    vm.services = [];
    vm.identificationTypes = ('NIT CC CE').split(' ').map(function(type) {
      return { value: type };
    });


    // Methods
    vm.saveProvider = saveProvider;
    vm.saveHeadquarter = saveHeadquarter;
    vm.updatHeadquarter = updatHeadquarter;
    vm.addOtherService = addOtherService;
    vm.editServiceDialog = editServiceDialog;
    vm.editHeadquarter = editHeadquarter;
    vm.goToProviders = goToProviders;
    vm.addUserToProviderDialog = addUserToProviderDialog;
    vm.deleteUserDialog = deleteUserDialog;
    vm.deleteHeadquarter = deleteHeadquarter;
    vm.deleteService = deleteService;


    function deleteService(evt, service, headquarter){
      _.remove(headquarter.services, function(s){
        return s._id === service._id;
      });

      ProviderService.update(headquarter).then(function(resp){
        headquarter.services = resp.services;
      });
    }


    function deleteHeadquarter(headquarter){
      headquarter.active = false;

      ProviderService.update(headquarter).then(function(resp){
        // Elimnarlo del array de headquarter
        _.remove(vm.headquarters, function(u){
          return u._id === headquarter._id;
        });
      });
    }


    function deleteUserDialog(ev, user){
      user.active = false;

      UsuarioService.update(user).then(function(resp){
        // Elimnarlo del array de usuarios
        _.remove(vm.usersProviders, function(u){
          return u._id === user._id;
        });
      });

    }


    function goToProviders(){
      $state.go('app.administracion.providers');
    }

    function editHeadquarter(headquarter){
      vm.currentTab = 1;
      if (headquarter){
        vm.headquarter = headquarter;
        vm.services = headquarter.services;

        vm.map = {
          center: {
            latitude: headquarter.loc[0],
          longitude: headquarter.loc[1]
          },
          markers:[{
            id: 0,
            coords: {
              latitude: headquarter.loc[0],
              longitude: headquarter.loc[1],
            },
          }],
          zoom: 16,
          dragging: false,
          bounds: {},
          events: {
            click: clickMarker
          }
        };
      } else {
        vm.headquarter = null;
        vm.services = [{
          _id: '57acc861ba02509575b00ac1',
          name: 'Lavado',
          description: 'Lavada, aspirada, chasis, grafito, hidratada de partes negras y brillada.',
          cost: 40000,
          type: 'CARWASH'
        }, {
          _id: '57ec1aa2ea7093b68ad574fd',
          name: 'Grúa',
          description: 'Transporte de todo tipo de vehiculos, maquinaria liviana.',
          cost: 70000,
          type: 'ASSISTANCE'
        }, {
          _id: '57fae2f2973f113d86e8508e',
          name: 'Reparación',
          description: 'Taller de Servicio mecánico, Reparación de Colisiones...',
          cost: 140000,
          type: 'MECHANICAL'
        }];
        // No va a editar uno sino q va a crear uno nuevo
        vm.edit = false;
      }
    }

    /**
     * 
     * 
     */
    function addOtherService(ev, headquarter) {
      

      $mdDialog.show({
        controller: 'ServiceDialogController',
        controllerAs: 'vm',
        templateUrl: 'app/main/pages/administracion/views/providers/dialogs/editService.html',
        parent: angular.element($document.find('#content-container')),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          Headquarter: headquarter,
          ServiceDetail: null,
          ServicesList: vm.services,
          Types: vm.serviceType
        }
      });
    }


    /**
     * Save new prodvider
     */
    function saveProvider() {

      ProviderService.update(vm.provider).then(function (res) {
        if (res._id) {
          vm.provider = res;
          
          if (vm.getCurrentUser.role === 'provider_app'){
            vm.currentTab = 0;
          } else {
            $state.go('app.administracion.providers');
          }

          showMessageOk({
            title: 'Provedor guardado',
            msj: 'El provedor fue actualizado de forma correcta.'
          });
        } else {
          showMessageError();
        }
      })
      
    }

    function addUserToProviderDialog(ev) {
      $mdDialog.show({
        controller: 'AddUserToProviderDialogController',
        controllerAs: 'vm',
        templateUrl: 'app/main/pages/administracion/views/providers/dialogs/add-user-to-provider/addUser.html',
        parent: angular.element($document.find('#content-container')),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          MyProvider: vm.provider,
          Users: vm.usersProviders,
        },
      });
    }

    /**
     * Open Edit contact dialog
     *
     */
    function updatHeadquarter() {
      
      var customerHeadquarter = {
        _id: vm.headquarter._id,
        name: vm.headquarter.name,
        type: {
          id: 2,
          name: 'DISTRIBUTOR'
        },
        city: vm.headquarter.city,
        address: vm.headquarter.address,
        identification: vm.provider.identification,
        representative: vm.provider.representative,
        payment: {
          businessName: vm.provider.payment.businessName,
          phoneNumber: vm.headquarter.payment.phoneNumber,
          email: vm.headquarter.payment.email
        },
        services: vm.services,
        channelId: vm.provider._id,
        channelName: vm.provider.name,
        distributorId: null,
        distributorName: null,
        customerCreateId: vm.provider._id,
        customerCreateName: vm.provider.name,
        loc: [vm.locHeadquarter.latitude, vm.locHeadquarter.longitude],
      };

      ProviderService.update(customerHeadquarter).then(function (res) {
        console.log('res', res);
        if (res._id) {
          customerHeadquarter = res;

          customerHeadquarter.distributorId = res._id; //Yo mismo
          customerHeadquarter.distributorName = res.name;

          vm.currentTab = 0;

          showMessageOk({
            title: 'Sede guardada',
            msj: 'La sede ' + customerHeadquarter.name + ' fue registrada con éxito.'
          });
        } else {
          showMessageError();
        }
      })
    }

    /**
     * Open Edit contact dialog
     *
     */
    function saveHeadquarter() {
      var customerHeadquarter = {
        name: vm.headquarter.name,
        type: {
          id: 2,
          name: 'DISTRIBUTOR'
        },
        city: vm.headquarter.city,
        address: vm.headquarter.address,
        identification: vm.provider.identification,
        representative: vm.provider.representative,
        payment: {
          businessName: vm.provider.payment.businessName,
          phoneNumber: vm.headquarter.payment.phoneNumber,
          email: vm.headquarter.payment.email
        },
        services: vm.services,
        channelId: vm.provider._id,
        channelName: vm.provider.name,
        distributorId: null,
        distributorName: null,
        customerCreateId: vm.provider._id,
        customerCreateName: vm.provider.name,
        loc: [vm.locHeadquarter.latitude, vm.locHeadquarter.longitude],
      };

      ProviderService.save(customerHeadquarter).then(function (res) {
        if (res._id) {
          customerHeadquarter = res;

          customerHeadquarter.distributorId = res._id; //Yo mismo
          customerHeadquarter.distributorName = res.name;

          // Actualizar el customer para agregar el channel
          ProviderService.update(customerHeadquarter).then();

          if (vm.getCurrentUser.role === 'provider_app'){
            $state.go('app.administracion.providers.edit');
          } else {
            $state.go('app.administracion.providers');
          }

          showMessageOk({
            title: 'Sede guardada',
            msj: 'La sede ' + customerHeadquarter.name + ' fue registrada con éxito.'
          });
        } else {
          showMessageError();
        }
      })
    }


    /**
     * Open Edit contact dialog
     *
     * @param ev
     * @param service
     */
    function editServiceDialog(ev, service) {
      $mdDialog.show({
        controller: 'ServiceDialogController',
        controllerAs: 'vm',
        templateUrl: 'app/main/pages/administracion/views/providers/dialogs/editService.html',
        parent: angular.element($document.find('#content-container')),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          ServiceDetail: service,
          ServicesList: vm.services,
          Types: vm.serviceType,
          Headquarter: vm.headquarter,
        }
      });
    }

    /**
     * Close dialog
     */
    function closeDialog() {
      $mdDialog.hide();
    }

    /**
     * Alert Customer Ok Dialog
     */
    function showMessageOk(info) {
      var alert = $mdDialog.alert()
        .title(info.tilte)
        .htmlContent(info.msj)
        .ariaLabel('save customer')
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
        .ariaLabel('error customer')
        .ok('Ok');

      $mdDialog.show(alert);
    }


    function clickMarker(gMarker, eventName, model) {
      vm.locHeadquarter = {
        latitude: model[0].latLng.lat(),
        longitude: model[0].latLng.lng()
      };

      vm.map.markers = [{
        id: 0,
        coords: {
          latitude: model[0].latLng.lat(),
          longitude: model[0].latLng.lng()
        }
      }];

      $scope.$apply();
    }

    uiGmapGoogleMapApi.then(function (maps) {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

          vm.map.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          vm.map.markers = [{
            id: 0,
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }];

        }, function () {
          console.log('Map');
        });
      } else {
        // Browser doesn't support Geolocation
        console.log('Browser does not support Geolocation');
      }

    });


  }

})();
