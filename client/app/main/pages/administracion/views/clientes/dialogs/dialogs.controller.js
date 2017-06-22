(function() {
  'use strict';

  angular
    .module('app.administracion')
    .controller('CustomerDialogController', CustomerDialogController);

  /** @ngInject */
  function CustomerDialogController($mdDialog,Customers, msUtils,
    Auth, CustomerService, UsuarioService, $state, appConfig) {
    var vm = this;

    // Data
    vm.title = 'Editar Cliente';
    vm.loading = false;
    vm.selectedIndex = 0;

    vm.customerLocked = false;
    vm.userLocked = true;
    vm.vehicleLocked = true;

    vm.showCustomerButtons = true;
    vm.showUserButtons = false;
    vm.showVehicleButtons = false;

    vm.contact = {};
    vm.customers = Customers;
    vm.getCurrentUser = Auth.getCurrentUser;

    vm.customerRoot = null;
    vm.customerChannels = null;
    vm.customerDistribuitors = null;
    vm.customerClients = null;
    vm.channelDisabled = true;
    vm.distributorDisabled = false;
    vm.clientDisabled = true;
    vm.showChannel = false;
    vm.showDistributor = false;
    vm.showClient = false;
    vm.listRoles = [];

    vm.newCustomer = false;
    vm.allFields = false;
    vm.customerTypes = [];
    _.uniq(_.map(vm.customers, 'type'), 'id');

    vm.identificationTypes = ('NIT CC CE').split(' ').map(function(type) {
      return {
        value: type
      };
    });

    init();
    loadChannels();


    if (!vm.customer) {
      vm.title = 'Nuevo Cliente';
      vm.newCustomer = true;

      // Methods
      validatedRole();
    }
    else{
      //Pintar los selecet de customer solo si es un cliente/flota
      changeCustomerType(vm.customer.type);
      if (vm.customer.type.id === '3') {
        vm.distributorSelected = {
          name: vm.customer.distributorName,
          _id: vm.customer.distributorId
        };
      }

      if (vm.customer.type.id === '2') {
        vm.showDistributor = false;
      }

      vm.channelSelected = {
        name: vm.customer.channelName,
        _id: vm.customer.channelId
      };
    }

    if (!vm.newCustomer) {
      // Data
      vm.showCost = vm.customer.type.id === '3' ? true : false;

      // Methods
      vm.exists = existsItem; //msUtils.exists;
    }

    // Methods
    vm.addNewCustomer = addNewCustomer;
    vm.addNewContact = addNewContact;
    vm.closeDialog = closeDialog;
    vm.toggleInArray = msUtils.toggleInArray;
    vm.changeCustomerType = changeCustomerType;
    vm.changeCustomer = changeCustomer;
    vm.loadChannels = loadChannels;
    vm.loadDistributors = loadDistributors;
    vm.loadClients = loadClients;
    vm.validatedRole = validatedRole();
    vm.customerTypeValue = CustomerService.renameType;
    vm.showCustomerByType = showCustomerByType;
    vm.goToCustomers = goToCustomers;

    function init() {
      var user = vm.getCurrentUser();
      var customersType = {
        'admin': function () {
          return [
            {id:1, name:'CHANNEL'}, {id:2, name:'DISTRIBUTOR'}, {id:3, name:'CLIENT'}
          ]
        },
        'cda': function () {
          return [
            {id:2, name:'DISTRIBUTOR'}, {id:3, name:'CLIENT'}
          ]
        },
        'sede': function () {
          return [
            {id:2, name:'DISTRIBUTOR'}, {id:3, name:'CLIENT'}
          ]
        }
      };

      vm.customerTypes = customersType[user.role]();

      //Cargar mis distribuidores
      var query = {type: '2', localId: user.customer.channelId };
      CustomerService.my(query).then(function(res){
        vm.customerDistribuitors = res;
      });

      myRoles(user);
    }

    function myRoles(user) {
      var roles = appConfig.userRoles;
      var myRoles={
        "admin": function () {
          vm.listRoles = roles;
        },
        "cda": function () {
          vm.listRoles =  _.remove(roles, function(r){
             return r !== "admin" && r !== "tecnico flota";
          });
        },
        "sede": function () {
          vm.listRoles =  _.remove(roles, function(r){
             return r !== "admin" && r !== "cda" &&
                    r !== "tecnico flota" && r !== "tecnico";
          });
        },
        "flota": function () {
          vm.listRoles =  _.remove(roles, function(r){
             return r !== "admin" && r !== "cda" &&
                    r !== "sede" && r !== "tecnico";
          });
        }
      }

      myRoles[user.role]();
      console.log(vm.listRoles);
    }

    function changeCustomer(type, customer) {
      switch (type) {
        case 1:
          vm.distributorDisabled = false;
          //Recargar las sedes
          loadDistributors(customer)
          break;
        case 2:
          vm.clientDisabled = false;
          break;
      }

    }

    function goToCustomers() {
      $state.go('app.administracion.clientes');
    }

    //////////
    // list of `Channels` value/display objects
    vm.querySearchChannels   = querySearchChannels;

    // list of `Channels` value/display objects
    vm.querySearchDistributors   = querySearchDistributors;

    /**
     * Search for Channels
     */
    function querySearchChannels (query) {
      var result = query ? vm.customerChannels.filter( createFilterFor(query) ) : vm.customerChannels;
      //Cargar las sedes del cda escogido
      loadDistributors(result[0]);
      return result;
    }

    // distributors
    function querySearchDistributors (query) {
      return query ? vm.customerDistribuitors.filter( createFilterFor(query) ) : vm.customerChannels;
    }

    function createFilterFor(query) {
      var uppercaseQuery = angular.uppercase(query);
      return function filterFn(state) {
        return (state.name.indexOf(uppercaseQuery) === 0);
      };
    }


    /**
     * Add new contact
     */
    function addNewCustomer() {
      //id
      // Show loading bar
      vm.loading = true;

      var user = vm.getCurrentUser();
      switch (vm.customerTypeSelected.id.toString()) {
        case '1':
          vm.customer.channelName = vm.customer.name;
          break;
        case '2':
          vm.customer.channelName = vm.channelSelected ? vm.channelSelected.name : user.customer.channelName;
          vm.customer.channelId = vm.channelSelected ? vm.channelSelected._id :user.customer.channelId;

          vm.customer.distributorName = vm.customer.name;
          break;
        case '3':
          vm.customer.channelName = vm.channelSelected ? vm.channelSelected.name : user.customer.channelName;
          vm.customer.channelId = vm.channelSelected ? vm.channelSelected._id :user.customer.channelId;

          vm.customer.distributorName = vm.distributorSelected.name;
          vm.customer.distributorId = vm.distributorSelected._id;
          break;
      };

      vm.customer.customerCreateId = user.customer.localId;
      vm.customer.customerCreateName = user.customer.localName;

      vm.customer.type = {
        id: vm.customerTypeSelected.id,
        name: vm.customerTypeSelected.name
      };

      if (vm.customer.identification) {
        vm.customer.identification.origin = 'CO';
      }



      var createDistributor = false;

      CustomerService.save(vm.customer).then(function(resp){
        if (resp._id) {
          var customer = resp;
          //Necesito actualizar el documento con el id
          switch (vm.customerTypeSelected.id.toString()) {
            case '1':
              customer.channelId = customer._id;
              createDistributor = true;
              break;
            case '2':
              customer.distributorId = customer._id;
              break;
            case '3':

              break;
          };
          CustomerService.update(customer).then(function(resp){
            if (resp._id) {

              vm.customer = resp;

              vm.customerLocked = true;
              vm.userLocked = false;
              vm.vehicleLocked = true;
              vm.selectedIndex = 1;

              vm.showCustomerButtons = false;
              vm.showVehicleButtons = false;
              vm.showUserButtons = true;

              if (createDistributor) {
                var _customer = vm.customer;
                _customer.customerCreateId = vm.customer._id;
                _customer.customerCreateName = vm.customer.name;
                createAutomaticDistributor(_customer);
              }
            }else{
              console.log(resp);
              showMessageError() ;
            }
          })
        } else{
          console.log(resp);
          showMessageError() ;
        }
      })

    }

    /**
     * Add new contact
     */
    function addNewContact()
    {
      var needCreateVehicule = false;
      switch (vm.customer.type.id) {
        case '1':
          vm.contact.role = 'cda';

          vm.contact.customer ={
            localId: vm.customer._id,
            localName: vm.customer.name,
            channelId : vm.customer.channelId,
            channelName : vm.customer.channelName,
            distributorId : null,
            distributorName : null
          };

          needCreateVehicule = true;
        break;
        case '2':
          vm.contact.role = 'sede';

          vm.contact.customer ={
            localId: vm.customer._id,
            localName: vm.customer.name,
            channelId : vm.customer.channelId,
            channelName : vm.customer.channelName,
            distributorId : vm.customer.distributorId,
            distributorName : vm.customer.distributorName
          };
        break;
        case '3':
          vm.contact.role = 'flota';

          vm.contact.customer ={
            localId: vm.customer._id,
            localName: vm.customer.name,
            channelId : vm.customer.channelId,
            channelName : vm.customer.channelName,
            distributorId : vm.customer.distributorId,
            distributorName : vm.customer.distributorName
          };

          needCreateVehicule = true;
        break;
      }

      if (vm.contact.additionalData) {
        if (vm.contact.additionalData.identification) {
          vm.contact.additionalData.identification.origin = 'CO';
        }
      }

      UsuarioService.save(vm.contact).then(function(resp){
        if (resp._id) {
          //HACER QUE SIGA A REGISTRAR UN VEHICULO
          if (needCreateVehicule) {
            vm.customerLocked = true;
            vm.userLocked = true;
            vm.vehicleLocked = false;
            vm.selectedIndex = 2;

            vm.showCustomerButtons = false;
            vm.showUserButtons = false;
            vm.showVehicleButtons = true;

            showMessageOk();
            closeDialog();
          } else {
            showMessageOk();
            closeDialog();
          }

          //Por ahora no creamos vehiculo, enotnces de una manda al index
          goToCustomers();
        }else{
          console.log(resp);
          showMessageError();
        }
      })

    }

    /**
     * Alert Customer Ok Dialog
     */
    function showMessageOk() {
      var alert = $mdDialog.alert()
        .title('Cliente guardado')
        .htmlContent('El cliente ha sido guardado de forma correcta.')
        .ariaLabel('save customer')
        .ok('OK');

      $mdDialog.show(alert);
    }

    /**
     * Alert Customer Error Dialog
     */
    function showMessageError() {
      var alert = $mdDialog.alert()
        .title('Error')
        .htmlContent('No se pudo guardar el cliente en este momento.')
        .ariaLabel('error customer')
        .ok('Ok');

      $mdDialog.show(alert);
    }

    /**
     * Save contact
     */
    function saveCustomer() {
      // Dummy save action
      if (vm.channelSelected) {
        vm.customer.channelId = vm.channelSelected._id;
        vm.customer.channelName = vm.channelSelected.name;
      }

      if (vm.distributorSelected) {
        vm.customer.distributorId = vm.distributorSelected._id;
        vm.customer.distributorName = vm.distributorSelected.name;
      }

      //Si no tiene el tipo de identification toca ponerle una por default
      if (vm.customer.identification) {
        if (vm.customer.identification.type === 'Unspecified') {
          vm.customer.identification.type = 'NIT';
        }
      } else {
        vm.customer.identification = {
          type: 'NIT'
        }
      }

      vm.customer.updateAt = new Date();
      //TODO: por ahora el origin de la identicacion del cliente es CO por default
      vm.customer.identification.origin = 'CO';

      console.log('customer: ', vm.customer);

      CustomerService.update(vm.customer).then(function(resp){
        if (resp._id) {
          showMessageOk();
          closeDialog();
        }else{
          console.log(resp);
          showMessageError() ;
        }
      })

    }

    /**
     * Close dialog
     */
    function closeDialog() {
      $mdDialog.hide();
    }

    /**
     * Check if item exists in a list
     *
     * @param item
     * @param list
     * @returns {boolean}
     */
    function existsItem(item, list) {
      if (list) {
        return list.name === item.name;
      }
    }

    /**
     * Change value showCost and customers when type is Client
     * @param type
     */
    function changeCustomerType(type) {
      if (type.id === '3') {
        if (vm.getCurrentUser().role === 'admin') {
          vm.showChannel = true;
        }else{
          vm.showChannel = false;
        }
        vm.showCost = true;
        vm.showDistributor = true;
        vm.showClient = false;
      } else {
        vm.showCost = false;
        vm.showChannel = false;
        vm.showDistributor = false;
        vm.showClient = false;
      }
    }

    /**
     * We review what role has the current user
     * to determine what we show
     */
    function validatedRole() {
      var roles = {
        'admin': function(){
          /*vm.showChannel = true;
          vm.showDistributor = true;
          vm.showClient = false;*/
          loadChannels();
          loadAllDistributors();
        },
        'cda': function(){
          vm.showChannel = false;
          if (vm.getCurrentUser().role === 'admin') {
            if (vm.customer) {
              vm.showDistributor = true;
            }else{
              vm.showDistributor = false;
            }
          }

          vm.showClient = false;
          loadDistributors();
          vm.distributorDisabled = false;
        },
        'sede': function(){
          vm.showChannel = false;
          vm.showDistributor = false;
          vm.showClient = false;
        }
      };

      roles[vm.getCurrentUser().role]();
    }

    /**
     *
     */
    function loadChannels() {
      var query = {type: '0', localId: 'unspecified' };
      CustomerService.my(query).then(function(res){
        vm.customerChannels = res;
      });
    }


    /**
     * Load all distributors/sedes
     */
    function loadAllDistributors(){
      var query = {type: '999', localId: 'unspecified'};
      CustomerService.my(query).then(function(res){
        vm.customerDistribuitors = res;
      });
    }

    /**
     * Loaded customers having a distributor/sede
     */
    function loadDistributors(customer) {
      var query = null;
      // Cuando el usuario es administrador el customer lo tiene
      // cuando es otro rol, toca sacar el customer del current user
      if (customer) {
        query = {type: '2', localId: customer._id };
      }else{
        query = {type: '2', localId: vm.getCurrentUser().customer.localId };
      }

      CustomerService.my(query).then(function(res){
        vm.customerDistribuitors = res;
      });
    }

    function loadClients(customer) {
      debugger
      var query = {type: '3', localId: customer._id };
      CustomerService.my(query).then(function(res){
        debugger
        vm.customerClients = res;
      });
    }

    /**
     * Load current user customers
     */
    function loadAllCustomers() {
      var query = {type: '2', localId: '57a126a9843f2e461320a365'}
      CustomerService.my(query).then(function(res) {
        debugger
        var data =  _.groupBy(res, '_id.type');

        //Fill Root
        /*vm.customerRoot = _.map(data['ROOT'], function(item){
          return {
            id: item._id.localId,
            name: item._id.name
          };
        });

        vm.customerChannel = _.map(data['CHANNEL'], function(item){
          return {
            id: item._id.localId,
            name: item._id.name
          };
        });

        vm.customerDistribuitor = _.map(data['DISTRIBUTOR'], function(item){
          return {
            id: item._id.localId,
            name: item._id.name
          };
        });

        vm.customerClient = _.map(data['CLIENT'], function(item){
          return {
            id: item._id.localId,
            name: item._id.name
          };
        });*/

      })
    }

    function createAutomaticDistributor(customer) {
      var distributor = {
        name: customer.name.toUpperCase() + " SEDE PRINCIPAL",
        channelName : customer.channelName,
        channelId : customer._id,
        distributorName: customer.name.toUpperCase() + " SEDE",
        type: {
          id : "2",
          name : "DISTRIBUTOR"
        },
        payment: customer.payment,
        identification: customer.identification,
        customerCreateName: customer.customerCreateName,
        customerCreateId: customer.customerCreateId,
      };

      CustomerService.save(distributor).then(function(res){
        if (res._id) {
          var customerUpdate = res;
          customerUpdate.distributorId = res._id;
          CustomerService.update(customerUpdate).then(function(resp){
            // Si todo sale bien vamos a la siguiente parte del registar
            // que es la creacion de un usuario
            vm.selectedIndex = 1;
            vm.userLocked = false;
          });
        }
      });
    }

    function showCustomerByType(type) {
      var customerType = {
        '0': function(){

        },
        //CDA
        '1':function(){
          vm.showChannel = false;
          vm.showDistributor = false;
          vm.showClient = false;
        },
        //SEDE
        '2':function(){
          vm.showChannel = true;
          vm.channelDisabled = false;
          vm.showDistributor = false;
          vm.showClient = false;
          //Cargar CDAS
          loadChannels();
        },
        //FLOTA
        '3':function(){
          vm.showChannel = true;
          vm.channelDisabled = false;
          vm.showDistributor = true;
          vm.showClient = false;
          vm.distributorDisabled = true;
          vm.showCost = true;
          //Cargar CDAS y las Sedes
          loadChannels();
          if (vm.getCurrentUser().role === 'admin') {
            loadAllDistributors();
          }
        }
      };
      customerType[type.id.toString()]();
    }
  }
})();
