(function() {
  'use strict';

  angular
    .module('app.pages.informes')
    .controller('InformesController', InformesController);

  /** @ngInject */
  function InformesController(Distributors, Technicals, InformesService, $filter, $mdSidenav, CardFilters, msUtils) {
    var vm = this;

    // Data
    vm.distributors = Distributors.data;
    vm.technicals = Technicals.data;
    vm.disabledExport = false;
    vm.dataReport = [];
    vm.gridOptions = {
      /*columnDefs: [{
        field: 'createdAt',
        displayName: 'Fecha'
      }, {
        field: 'vehicle.plate',
        displayName: 'Placa'
      }, {
        field: 'userReview.name',
        displayName: 'Tecnico'
      }, {
        field: 'customer.localName',
        displayName: 'Flota'
      }, {
        field: 'type',
        displayName: 'Tipo Revision'
      }, {
        field: 'customer.channelName',
        displayName: 'CDA',
        visible: false
      }, {
        field: 'customer.distributorName',
        displayName: 'Sede',
        visible: false
      }],*/
      enableGridMenu: true,
      exporterMenuPdf: false,
      exporterCsvFilename: 'mobi_business_reviews.csv',
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
      onRegisterApi: function(gridApi) {
        vm.gridApi = gridApi;
      }
    }

    // Methods
    vm.querySearchTechnical = querySearchTechnical;
    vm.findReviews = findReviews;
    vm.toggleSidenav = toggleSidenav;


    //////////

    function querySearchTechnical(query) {
      return query ? vm.technicals.filter(createFilterFor(query)) : vm.technicals;
    }

    function findReviews() {
      var technical = undefined;

      if (vm.technicalSelected) {
        technical = vm.technicalSelected._id
      }

      var query = {
        startDate: vm.startDate,
        endDate: vm.endDate,
        fleet: vm.distributorSelected,
        technical: technical,
        plate: vm.plateNumber
      }

      console.log(query);
      if (vm.startDate != undefined || vm.endDate != undefined || vm.distributorSelected != undefined ||
      technical != undefined || vm.plateNumber != undefined ) {
        InformesService.find(query).then(function(res) {
        //Si no har errores
          if (!res.errors) {
            vm.disabledExport = false;
            vm.dataReport= res;
            /*
            _.each(res, function(item) {
              var _review = {
                "Fecha": $filter('date')(item.createdAt, 'medium'),
                "Placa": item.vehicle.plate,
                "Tecnico": item.userReview.name,
                "Flota": item.customer.localName,
                (query)Tipo Revisión": item.type
              };
              vm.dataReport.push(_review);
            })
            vm.gridOptions.data = vm.dataReport;*/
          }
        })
      }else{
        alert("Escoje un filtro")
      };
      
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var uppercaseQuery = angular.uppercase(query);
      return function filterFn(technical) {
        return (technical.name.indexOf(uppercaseQuery) === 0);
      };
    }


    /**
    * Toggle sidenav
    *
    * @param sidenavId
    */
    function toggleSidenav(sidenavId)
    {
      $mdSidenav(sidenavId).toggle();
    }



  }

    
})();
