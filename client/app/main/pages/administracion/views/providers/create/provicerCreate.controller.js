(function () {

  'use strict';

  angular
    .module('app.administracion')
    .controller('ProviderCreateController', ProviderCreateController);

  function ProviderCreateController($scope, $state, $mdDialog, $document,
    uiGmapGoogleMapApi, ProviderService, ServicesType, Auth) {
    var vm = this;


    // Data
    vm.currentTab = 0;
    vm.provider = {};
    vm.getCurrentUser = Auth.getCurrentUser();
    vm.serviceType = ServicesType.data[0].values;
    vm.customerLocked = false;
    vm.headQuartersLocked = true;
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

    vm.identificationTypes = ('NIT CC CE').split(' ').map(function(type) {
      return { value: type };
    });

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


    // Methods
    vm.saveProvider = saveProvider;
    vm.saveHeadquarter = saveHeadquarter;
    vm.addOtherService = addOtherService;
    vm.editServiceDialog = editServiceDialog;
    vm.closeDialog = closeDialog;
    vm.goToProviders = goToProviders;


    function goToProviders(){
      $state.go('app.administracion.providers');
    }

    /**
     *
     *
     */
    function addOtherService(ev) {


      $mdDialog.show({
        controller: 'ServiceDialogController',
        controllerAs: 'vm',
        templateUrl: 'app/main/pages/administracion/views/providers/dialogs/editService.html',
        parent: angular.element($document.find('#content-container')),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
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
      var customer = vm.getCurrentUser.customer;
      console.log('customer', customer);

      vm.provider.payment.phoneNumber = vm.provider.representative.cellPhoneNumber;
      vm.provider.payment.email = vm.provider.representative.email;

      vm.provider.type = {
        id: 4,
        name: 'PROVIDER'
      };

      vm.provider.channelId = customer.channelId; //Yo mismo
      vm.provider.channelName = customer.channelName;
      vm.provider.distributorId = null;
      vm.provider.distributorName = null;
      vm.provider.customerCreateId = customer.localId;
      vm.provider.customerCreateName = customer.localName;

      ProviderService.save(vm.provider).then(function (res) {
        if (res._id) {
          vm.provider = res;

          /*vm.provider.localId = res._id; //Yo mismo
          vm.provider.localName = res.name;

          // Actualizar el customer para agregar el channel
          ProviderService.update(vm.provider).then();*/

          vm.currentTab = 1;

          vm.customerLocked = false;
          vm.headQuartersLocked = false;

          showMessageOk({
            title: 'Provedor guardado',
            msj: 'El provedor fue creado, puedes crear las sedes ahora mismo.'
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
      var customer = vm.getCurrentUser.customer;
      console.log('customer', customer);

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
        customerCreateId: customer.localId,
        customerCreateName: customer.localName,
        loc: [vm.locHeadquarter.latitude, vm.locHeadquarter.longitude],
      };

      ProviderService.save(customerHeadquarter).then(function (res) {
        if (res._id) {
          customerHeadquarter = res;

          customerHeadquarter.distributorId = res._id; //Yo mismo
          customerHeadquarter.distributorName = res.name;

          // Actualizar el customer para agregar el channel
          ProviderService.update(customerHeadquarter).then();

          $state.go('app.administracion.providers');

          showMessageOk({
            title: 'Sede guardada',
            msj: 'La sede ' + customerHeadquarter.name + ' fue registrada con éxito.'
          });
        } else {
          showMessageError();
        }
      })

      console.log('SEDE: ', customerHeadquarter);
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
          Types: vm.serviceType
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

          vm.locHeadquarter = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };

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
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

    });


  }

})();
