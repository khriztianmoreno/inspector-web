(function() {
  'use strict';

  angular
    .module('app.administracion')
    .controller('VehicleDetailController', VehicleDetailController);

  /** @ngInject */
  function VehicleDetailController($document, $state, $rootScope, $scope, Vehicle, Brands, Lines, Classes, Documents, CustomerService, Auth, VehicleService, Upload) {
    var vm = this;

    // Data
    vm.vehicle = Vehicle.data;
    vm.key = 0;

    vm.selectedIndex = 0;
    vm.selectedCustomer = vm.vehicle.customer.localName;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.customers = null;
    vm.brands = Brands.data[0].values;
    vm.lines = Lines.data[0].values;
    vm.classe = Classes.data[0].values;
    vm.allDocuments = Documents.data[0].values;

    //Image configuration

    // Methods
    vm.goToVehicles = goToVehicles;
    vm.goToReview = goToReview;
    vm.fileAdded = fileAdded;
    vm.upload = upload;
    vm.fileSuccess = fileSuccess;
    vm.addNewVehicle = addNewVehicle;
    vm.saveVehicle = saveVehicle;
    vm.addDocument = addDocument;
    vm.removeDocument = removeDocument;

    //////////

    init();

    /**
     * Initialize
     */
    function init() {
      if (vm.vehicle) {
        if (vm.vehicle.documents.length > 0) {
          for (var i = 0; i < vm.vehicle.documents.length; i++) {
            vm.vehicle.documents[i].expeditionDate = new Date(vm.vehicle.documents[i].expeditionDate);
            vm.vehicle.documents[i].expirationDate = new Date(vm.vehicle.documents[i].expirationDate);
          }
        }
      }

      CustomerService.distributors().then(function(resp){
        vm.customers = resp;
        vm.allCustomers = loadAllCustomers();
      })
    }

    /**
     * Go to vehicles page
     */
    function goToVehicles() {
      $state.go('app.administracion.vehiculos');
    }

    /**
     * Go to review
     */
    function goToReview(id){
      $state.go('app.consolidado.detalle', { id: id });
    }

    /**
     * File added callback
     * Triggers when files added to the uploader
     *
     * @param file
     */
    function fileAdded(file) {
      // Prepare the temp file data for media list
      var uploadingFile = {
        id: file.uniqueIdentifier,
        file: file,
        type: 'uploading'
      };
      // Append it to the media list
      //vm.product.images.unshift(uploadingFile);
      vm.vehicle.images.unshift(uploadingFile);
    }

    /**
     * Upload
     * Automatically triggers when files added to the uploader
     */
    function upload() {
      // Set headers
      vm.ngFlow.flow.opts.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
      };

      vm.ngFlow.flow.upload();
    }

    /**
     * File upload success callback
     * Triggers when single upload completed
     *
     * @param file
     * @param message
     */
    function fileSuccess(file, message) {
      // Iterate through the media list, find the one we
      // are added as a temp and replace its data
      // Normally you would parse the message and extract
      // the uploaded file data from it
      angular.forEach(vm.vehicle["images"], function(media, index) {
        if (media.id === file.uniqueIdentifier) {
          // Normally you would update the media item
          // from database but we are cheating here!
          var fileReader = new FileReader();
          fileReader.readAsDataURL(media.file.file);
          fileReader.onload = function(event) {
            media.url = event.target.result;
          };
          // Update the image type so the overlay can go away
          media.type = 'image';
        }
      });
    }

    /**
     *
     */
    function saveVehicle() {
      console.log('Vehicle', vm.vehicle);
      VehicleService.update(vm.vehicle).then(function(resp){
        if (resp._id) {
          alert('OK');
        }
      });
    }

    /**
     *
     */
    function addNewVehicle() {
      VehicleService.save(vm.vehicle).then(function(resp){
        if (resp._id) {
          alert('OK');
        }
      });
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
