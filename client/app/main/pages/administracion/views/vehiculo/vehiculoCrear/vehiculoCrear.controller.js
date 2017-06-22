(function() {
    'use strict';

    angular
        .module('app.administracion')
        .controller('AdminVehiculoCrearController', AdminVehiculoCrearController);

    function AdminVehiculoCrearController(Brands, Lines, Classes, Documents,
      CustomerService, Auth, VehicleService, $state) {
        var vm = this;

        vm.getCurrentUser = Auth.getCurrentUser;
        vm.customers = null;
        vm.brands = Brands.data[0].values;
        vm.lines = Lines.data[0].values;
        vm.classe = Classes.data[0].values;
        vm.allDocuments = Documents.data[0].values;
        vm.verticalStepper = {
            step1: {},
            step2: {},
            step3: {},
            step4: {},
            step5: {}
        };
        vm.customers = null;
        vm.vehicle = {
          documents: []
        };

        //Methods
        vm.addDocument = addDocument;
        vm.removeDocument = removeDocument;
        vm.addNewVehicle = addNewVehicle;

        init();

        /**
         * Initialize
         */
        function init() {
          CustomerService.distributors().then(function(resp){
            vm.customers = resp;
            vm.allCustomers = loadAllCustomers();
          })
        }

        /**
         *
         */
        function addNewVehicle() {
          vm.vehicle.plate.origin = 'CO';
          VehicleService.save(vm.vehicle).then(function(resp){
            if (resp._id) {
              var alert = $mdDialog.alert()
                  .title('Vehículo guardado')
                  .htmlContent('La revisión realizada al vehículo <b>'+
                    vm.vehicle.plate.number + '</b> fue registrada.')
                  .ariaLabel('save inspection')
                  .ok('OK');

              $mdDialog.show(alert);

              $state.go('app.administracion.vehiculos');
            }
          });

          console.log('Vehicle', vm.vehicle);
        }

        /**
         *
         * @param
         */
        function addDocument(type) {
          console.log('type', type);
          var document ={
            type: type,

          }
          vm.vehicle.documents.push(document);
          vm.selectedIndex = vm.vehicle.documents.length - 1;
        }

        /**
         *  Remove document
         * @param tabindex
         */
        function removeDocument(tab) {
          var index = vm.vehicle.documents.indexOf(tab);
          vm.vehicle.documents.splice(index, 1);
        }

        // list of `Customers` value/display objects
        vm.querySearchCustomers   = querySearchCustomers;
        vm.selectedCustomerChange = selectedCustomerChange;

        // list of `Brands` value/display objects
        vm.allBrands        = loadAllBrands();
        vm.querySearchBrands   = querySearchBrands;
        vm.newBrand = newBrand;

        // list of `Classes` value/display objects
        vm.allClasses        = loadAllClasses();
        vm.querySearchClasses   = querySearchClasses;
        vm.newClass = newClass;

        // list of `Lines` value/display objects
        vm.allLines        = loadAllLines();
        vm.querySearchLines   = querySearchLines;
        vm.newLine = newLine;

        function newBrand(brand) {
          alert("Sorry! You'll need to create a Constitution for " + brand + " first!");
        }

        function newClass(item) {
          alert("Sorry! You'll need to create a Constitution for " + item + " first!");
        }

        function newLine(line) {
          alert("Sorry! You'll need to create a Constitution for " + line + " first!");
        }

        // ******************************
        // Internal methods
        // ******************************

        /**
         * Search for Customers
         */
        function querySearchCustomers (query) {
          return query ? vm.allCustomers.filter( createFilterForCustomers(query) ) : vm.allCustomers;
        }
        /**
         * Search for Brands
         */
        function querySearchBrands (query) {
          return query ? vm.allBrands.filter( createFilterFor(query) ) : vm.allBrands;
        }
        /**
         * Search for Brands
         */
        function querySearchClasses (query) {
          return query ? vm.allClasses.filter( createFilterFor(query) ) : vm.allClasses;
        }
        /**
         * Search for Lines
         */
        function querySearchLines (query) {
          return query ? vm.allLines.filter( createFilterFor(query) ) : vm.allLines;
        }

        function selectedCustomerChange(item) {
          if (item) {
            vm.vehicle.customer = {
              localName: item.name,
              localId: item._id,
              channelId: item.channelId,
              channelName: item.channelName,
              distributorId: item.distributorId,
              distributorName: item.distributorName
            };
          }
          //console.info('Item changed to ' + JSON.stringify(item));
        }

        /**
         * Build `Brands` list of key/value pairs
         */
        function loadAllCustomers() {
          return vm.customers.map( function (customer) {
            return {
              value: customer.name,
              name: customer.name,
              _id: customer._id,
              channelId : customer.channelId,
              channelName : customer.channelName,
              distributorId: customer.distributorId,
              distributorName: customer.distributorName
            };
          });
        }

        /**
         * Build `Brands` list of key/value pairs
         */
        function loadAllBrands() {
          return vm.brands.map( function (brand) {
            return brand;
            /*return {
              value: brand.toLowerCase(),
              display: brand
            };*/
          });
        }

        /**
         * Build `Classes` list of key/value pairs
         */
        function loadAllClasses() {
          return vm.classe.map( function (item) {
            return item;
            /*return {
              value: item.toLowerCase(),
              display: item
            };*/
          });
        }

        /**
         * Build `Classes` list of key/value pairs
         */
        function loadAllLines() {
          return vm.lines.map( function (line) {
            return line;
            /*return {
              value: line.toLowerCase(),
              display: line
            };*/
          });
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
          var uppercaseQuery = angular.uppercase(query);
          return function filterFn(state) {
            return (state.indexOf(uppercaseQuery) === 0);
          };
        }

        function createFilterForCustomers(query) {
          var uppercaseQuery = angular.uppercase(query);
          return function filterFn(state) {
            return (state.value.indexOf(uppercaseQuery) === 0);
          };
        }
    }
})();
