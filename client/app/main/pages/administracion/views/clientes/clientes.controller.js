(function() {
  'use strict';

  angular
    .module('app.administracion')
    .controller('CustomerController', CustomerController);

  /** @ngInject */
  function CustomerController($mdSidenav, Customers, msUtils, $mdDialog, $document,
    Auth, $state)
  {

    var vm = this;

    // Data
    vm.customers = Customers.data;
    vm.filterIds = null;
    vm.listType = 'all';
    vm.listOrder = 'name';
    vm.listOrderAsc = false;
    vm.selectedContacts = [];
    vm.newGroupName = '';
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.customerTypes = _.uniqBy(_.map(vm.customers, 'type'), 'id');

    // Methods
    vm.filterChange = filterChange;
    vm.goToCreateCustomer = goToCreateCustomer;
    vm.editContactDialog = editContactDialog;
    vm.deleteContactConfirm = deleteContactConfirm;
    vm.deleteContact = deleteContact;
    vm.deleteSelectedContacts = deleteSelectedContacts;
    vm.toggleSelectContact = toggleSelectContact;
    vm.deselectContacts = deselectContacts;
    vm.selectAllContacts = selectAllContacts;
    vm.deleteContact = deleteContact;
    vm.addNewGroup = addNewGroup;
    vm.deleteGroup = deleteGroup;
    vm.toggleSidenav = toggleSidenav;
    vm.toggleInArray = msUtils.toggleInArray;
    vm.exists = msUtils.exists;




    //////////

    /**
     * Change Contacts List Filter
     * @param type
     */
    function filterChange(value) {
      vm.listType = value;
      if (value === 'all') {
        vm.filterIds = null;
      } else {
        vm.filterIds = _.filter(vm.customers, function(o) { return o.type.id === value.id; });
      }

      vm.selectedContacts = [];

    }

    /**
     * Open new contact dialog
     *
     * @param ev
     * @param contact
     */
    function goToCreateCustomer() {
      $state.go('app.administracion.clientes.crear');
    }

    /**
     * Open Edit contact dialog
     *
     * @param ev
     * @param contact
     */
    function editContactDialog(ev, customer) {
      $mdDialog.show({
        controller: 'CustomerEditDialogController',
        controllerAs: 'vm',
        templateUrl: 'app/main/pages/administracion/views/clientes/dialogs/contact/edit.html',
        parent: angular.element($document.find('#content-container')),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          Customers: vm.customers,
          Customer: customer,
        }
      });
    }

    /**
     * Delete Contact Confirm Dialog
     */
    function deleteContactConfirm(contact, ev) {
      //TODO: Desactivar el usuario
      var confirm = $mdDialog.confirm()
        .title('Are you sure want to delete the contact?')
        .htmlContent('<b>' + contact.name + '</b> '+ ' will be deleted.')
        .ariaLabel('delete contact')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function() {

        deleteContact(contact);
        vm.selectedContacts = [];

      }, function() {

      });
    }

    /**
     * Delete Contact
     */
    function deleteContact(contact) {
      //
    }

    /**
     * Delete Selected Contacts
     */
    function deleteSelectedContacts(ev) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure want to delete the selected contacts?')
        .htmlContent('<b>' + vm.selectedContacts.length + ' selected</b>' + ' will be deleted.')
        .ariaLabel('delete contacts')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function() {

        vm.selectedContacts.forEach(function(contact) {
          deleteContact(contact);
        });

        vm.selectedContacts = [];

      });

    }

    /**
     * Toggle selected status of the contact
     *
     * @param contact
     * @param event
     */
    function toggleSelectContact(contact, event) {
      if (event) {
        event.stopPropagation();
      }

      if (vm.selectedContacts.indexOf(contact) > -1) {
        vm.selectedContacts.splice(vm.selectedContacts.indexOf(contact), 1);
      } else {
        vm.selectedContacts.push(contact);
      }
    }

    /**
     * Deselect contacts
     */
    function deselectContacts() {
      vm.selectedContacts = [];
    }

    /**
     * Sselect all contacts
     */
    function selectAllContacts() {
      vm.selectedContacts = vm.filteredContacts;
    }

    /**
     *
     */
    function addNewGroup() {

    }

    /**
     * Delete Group
     */
    function deleteGroup(ev) {


    }

    /**
     * Toggle sidenav
     *
     * @param sidenavId
     */
    function toggleSidenav(sidenavId) {
      $mdSidenav(sidenavId).toggle();
    }

  }

})();
