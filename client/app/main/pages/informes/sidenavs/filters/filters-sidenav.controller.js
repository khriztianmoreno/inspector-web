(function ()
{
    'use strict';

    angular
        .module('app.pages.informes')
        .controller('FiltersSidenavController', FiltersSidenavController);

    /** @ngInject */
    function FiltersSidenavController(Distributors, Technicals, InformesService, $filter, $mdSidenav, CardFilters)
    {
        var vm = this;

        // Data
        vm.selectedMenu = 'Settings';

        // Methods
        vm.exists = msUtils.exists;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.clearFilters = CardFilters.clear;
        vm.filteringIsOn = CardFilters.isOn;
        vm.findReviews = findReviews;

        ////////


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
                console.log(res);
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



    }

    
})();
