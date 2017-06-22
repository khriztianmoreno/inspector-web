(function() {
  'use strict';

  angular
    .module('app.administracion')
    .controller('CustomerEditDialogController', CustomerEditDialogController);

  /** @ngInject */
  function CustomerEditDialogController($mdDialog, Customer, Customers, msUtils,
    Auth, CustomerService, $mdToast, $q, $state) {
    var vm = this;

    // Data
    vm.title = 'Editar Cliente';
    vm.customer = angular.copy(Customer);
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
    vm.saveCustomer = saveCustomer;
    vm.deleteContactConfirm = deleteContactConfirm;
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
      var user = vm.getCurrentUser();
      switch (vm.customerTypeSelected.id.toString()) {
        case '1':
          vm.customer.channelName = vm.customer.name;
          break;
        case '2':
          vm.customer.channelName = vm.channelSelected.name;
          vm.customer.channelId = vm.channelSelected._id;

          vm.customer.distributorName = vm.customer.name;
          break;
        case '3':
          vm.customer.channelName = vm.channelSelected.name;
          vm.customer.channelId = vm.channelSelected._id;

          vm.customer.distributorName = vm.distributorSelected.name;
          vm.customer.distributorId = vm.distributorSelected._id;
          break;
      };

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
              showMessageOk();
              closeDialog();

              vm.customer._id= resp._id;
              vm.customers.unshift(vm.customer);

              if (createDistributor) {
                var customer = vm.customer;
                createAutomaticDistributor(customer);
              }
            }else{
              console.log(resp);
              showMessageError() ;
            }
          })
        } else{
          console.log(resp);
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

      vm.customer.customerCreateId = vm.getCurrentUser().customer.localId;
      vm.customer.customerCreateName = vm.getCurrentUser().customer.localName;

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
     * Delete Contact Confirm Dialog
     */
    function deleteContactConfirm(ev) {
      //TODO: Desactivar el usuario
      var confirm = $mdDialog.confirm()
        .title('Are you sure want to delete the contact?')
        .htmlContent('<b>' + vm.customer.name + ' ' + '</b>' + ' will be deleted.')
        .ariaLabel('delete contact')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function() {

        //Eliminar

      });
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
        identification: customer.identification
      };

      CustomerService.save(distributor).then(function(res){
        if (res._id) {
          var customerUpdate = res;
          customerUpdate.distributorId = res._id;
          CustomerService.update(customerUpdate).then(function(resp){
            console.log('Update distributor automatic', resp);
            $state.reload();
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
