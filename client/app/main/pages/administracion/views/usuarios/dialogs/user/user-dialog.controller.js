(function ()
{
    'use strict';

    angular
        .module('app.administracion')
        .controller('UserDialogController', UserDialogController);

    /** @ngInject */
    function UserDialogController($mdDialog, Contact, Contacts, msUtils, appConfig, CustomerService, UsuarioService, Auth)
    {
        var vm = this;

        // Data
        vm.title = 'Editar Usuario';
        vm.contact = angular.copy(Contact);
        vm.getCurrentUser = Auth.getCurrentUser();
        vm.contacts = Contacts;
        vm.newContact = false;
        vm.allFields = false;
        vm.listRoles = [];
        vm.showAdmin = false;
        vm.showCda = false;
        vm.showSede = false;
        vm.showFlota = false;
        vm.identificationTypes = ('NIT CC CE').split(' ').map(function(type) {
          return {
            value: type
          };
        });

        if ( !vm.contact )
        {
            vm.title = 'Nuevo Usuario';
            vm.newContact = true;
        }

        // Methods
        init();
        vm.addNewContact = addNewContact;
        vm.saveContact = saveContact;
        vm.deleteContactConfirm = deleteContactConfirm;
        vm.closeDialog = closeDialog;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.myCustomers = myCustomers();
        vm.loadCustomers = myCustomers;

        //////////

        function init() {
          myRoles();
        }

        function myRoles() {
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

          myRoles[vm.getCurrentUser.role]();
          console.log(vm.listRoles);
        }


        /**
         * Add new contact
         */
        function addNewContact()
        {
          vm.contact.role = vm.roleSelected;
          //vm.password= 'abc123';

          switch (vm.roleSelected) {
            case 'admin':
              vm.contact.customer ={
                localId: vm.customerSelected._id,
                localName: vm.customerSelected.name,
                channelId : null,
                channelName : null,
                distributorId : null,
                distributorName : null
              };
            break;
            case 'cda':
              vm.contact.customer ={
                localId: vm.customerSelected._id,
                localName: vm.customerSelected.name,
                channelId : vm.customerSelected.channelId,
                channelName : vm.customerSelected.channelName,
                distributorId : null,
                distributorName : null
              };
            break;
            case 'sede':
              vm.contact.customer ={
                localId: vm.customerSelected._id,
                localName: vm.customerSelected.name,
                channelId : vm.customerSelected.channelId,
                channelName : vm.customerSelected.channelName,
                distributorId : vm.customerSelected.distributorId,
                distributorName : vm.customerSelected.distributorName
              };
            break;
            case 'flota':
              vm.contact.customer ={
                localId: vm.customerSelected._id,
                localName: vm.customerSelected.name,
                channelId : vm.customerSelected.channelId,
                channelName : vm.customerSelected.channelName,
                distributorId : vm.customerSelected.distributorId,
                distributorName : vm.customerSelected.distributorName
              };
            break;
            case 'tecnico':
              vm.contact.customer ={
                localId: vm.customerSelected._id,
                localName: vm.customerSelected.name,
                channelId : vm.customerSelected.channelId,
                channelName : vm.customerSelected.channelName,
                distributorId : null,
                distributorName : null
              };
            break;
            case 'tecnico flota':
              vm.contact.customer ={
                localId: vm.customerSelected._id,
                localName: vm.customerSelected.name,
                channelId : vm.customerSelected.channelId,
                channelName : vm.customerSelected.channelName,
                distributorId : vm.customerSelected.distributorId,
                distributorName : vm.customerSelected.distributorName
              };
            break;
          }

          if (vm.contact.additionalData) {
            if (vm.contact.additionalData.identification) {
              vm.contact.additionalData.identification.origin = 'CO';
            }
          }

          UsuarioService.save(vm.contact).then(function(resp){
            if (resp._id) {
              showMessageOk()
              vm.contacts.unshift(vm.contact);
              closeDialog();
            }else{
              console.log(resp);
              showMessageError();
            }
          })

          init();

        }

        /**
         * Save contact
         */
        function saveContact()
        {
          vm.contact.role = vm.roleSelected;
          switch (vm.roleSelected) {
            case 'admin':
              vm.contact.customer ={
                localId: vm.customerSelected._id,
                localName: vm.customerSelected.name,
                channelId : null,
                channelName : null,
                distributorId : null,
                distributorName : null
              };
            break;
            case 'cda':
              vm.contact.customer ={
                localId: vm.customerSelected._id,
                localName: vm.customerSelected.name,
                channelId : vm.customerSelected.channelId,
                channelName : vm.customerSelected.channelName,
                distributorId : null,
                distributorName : null
              };
            break;
            case 'sede':
              vm.contact.customer ={
                localId: vm.customerSelected._id,
                localName: vm.customerSelected.name,
                channelId : vm.customerSelected.channelId,
                channelName : vm.customerSelected.channelName,
                distributorId : vm.customerSelected.distributorId,
                distributorName : vm.customerSelected.distributorName
              };
            break;
            case 'flota':
              vm.contact.customer ={
                localId: vm.customerSelected._id,
                localName: vm.customerSelected.name,
                channelId : vm.customerSelected.channelId,
                channelName : vm.customerSelected.channelName,
                distributorId : vm.customerSelected.distributorId,
                distributorName : vm.customerSelected.distributorName
              };
            break;
            case 'tecnico':
              vm.contact.customer ={
                localId: vm.customerSelected._id,
                localName: vm.customerSelected.name,
                channelId : vm.customerSelected.channelId,
                channelName : vm.customerSelected.channelName,
                distributorId : null,
                distributorName : null
              };
            break;

          }

          if (vm.contact.additionalData.identification) {
            vm.contact.additionalData.identification.origin = 'CO';
          }

          UsuarioService.update(vm.contact).then(function(resp){
            if (resp._id) {
              showMessageOk()
              closeDialog();
            }else{
              showMessageError()
            }
          });

        }

        /**
         * Alert Customer Ok Dialog
         */
        function showMessageOk() {
            var alert = $mdDialog.alert()
                .title('Usuario guardado')
                .htmlContent('El usuario ha sido guardado de forma correcta.')
                .ariaLabel('save user')
                .ok('OK');

            $mdDialog.show(alert);
        }

        /**
         * Alert Customer Error Dialog
         */
        function showMessageError() {
            var alert = $mdDialog.alert()
                .title('Error')
                .htmlContent('No se pudo guardar el usuario en este momento.')
                .ariaLabel('error user')
                .ok('Ok');

            $mdDialog.show(alert);
        }

        /**
         * Delete Contact Confirm Dialog
         */
        function deleteContactConfirm(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the contact?')
                .htmlContent('<b>' + vm.contact.name + ' ' + vm.contact.lastName + '</b>' + ' will be deleted.')
                .ariaLabel('delete contact')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {

                vm.contacts.splice(vm.contacts.indexOf(Contact), 1);

            });
        }

        /**
         * Close dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }

        /**
         *
         */
        function myCustomers(role) {
          var query = null, filter = null;

          if ( !vm.contact )
          {
            vm.contact = {
              role: ''
            }
          }

          if (role) {
            filter = role;
          } else{
            filter = vm.contact.role;
          }


          switch (filter) {
            case 'admin':
              query = {'type': 0};
              vm.showAdmin = true;
              vm.showCda = false;
              vm.showSede = false;
              vm.showFlota = false;
            break;
            case 'cda':
              query = {'type': 1};
              vm.showCda = true;
              vm.showAdmin = false;
              vm.showSede = false;
              vm.showFlota = false;
            break;
            case 'tecnico':
              query = {'type': 1};
              vm.showCda = true;
              vm.showAdmin = false;
              vm.showSede = false;
              vm.showFlota = false;
            break;
            case 'sede':
              query = {'type': 2};
              vm.showAdmin = false;
              vm.showCda = false;
              vm.showSede = true;
              vm.showFlota = false;
            break;
            case 'flota':
              query = {'type': 3};
              vm.showAdmin = false;
              vm.showCda = false;
              vm.showSede = false;
              vm.showFlota = true;
            break;
            case 'tecnico flota':
              query = {'type': 3};
              vm.showAdmin = false;
              vm.showCda = false;
              vm.showSede = false;
              vm.showFlota = true;
            break;
          };

          if (query) {
            CustomerService.filter(query).then(function(resp){
              switch (filter) {
                case 'admin':
                  vm.customerRoots = resp;
                break;
                case 'cda':
                  vm.customerChannels = resp;
                break;
                case 'tecnico':
                  vm.customerChannels = resp;
                break;
                case 'sede':
                  vm.customerDistribuitors = resp;
                break;
                case 'flota':
                  vm.customerClients = resp;
                break;
                case 'tecnico flota':
                  vm.customerClients = resp;
                break;
              };
            })
          }
        }

    }
})();
