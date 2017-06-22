(function () {
    'use strict';

    angular
        .module('app.administracion')
        .controller('AdminVehiculosController', AdminVehiculosController);

    /** @ngInject */
    function AdminVehiculosController($state, $mdDialog, $http, vehiclesData, ApiEndpoint) {
        var vm = this;
        // Data

        vm.vehicles = vehiclesData.data.docs;
        vm.search = '';
        vm.pageSettings = {
            size: 10
        };

        vm.dtInstance = {};

        vm.paginationData = {
            total: vehiclesData.data.total,
            rowsByPage: vehiclesData.data.limit,
            currentPage: vehiclesData.data.page,
            pagesLength: vehiclesData.data.pages
        };

        vm.options = {
            initComplete: function () {
                var searchBox = angular.element('body').find('#adminstracion-vehiculos-busqueda');

                // Bind an external input as a table wide search box
                if (searchBox.length > 0) {
                    searchBox.on('keyup', function (event) {
                        if (event.keyCode === 13) {
                            getVehiclesByFilter();
                        }
                    });
                }
            },
            scrollY: 'auto',
            responsive: true,
            paging: false,
            searching: false,
            info: false
        };

        vm.pageSizes = [10, 20, 30, 50, 100].map(function (menuSize) {
            return {
                size: menuSize
            };
        });

        // Methods

        vm.gotoVehiclesDetail = gotoVehiclesDetail;
        vm.gotoCreateVehicle = gotoCreateVehicle;
        vm.gotoUpload = gotoUpload;
        vm.getVehiclesByFilter = getVehiclesByFilter;
        vm.getVehiclesPaginated = getVehiclesPaginated;
        vm.previousPage = previousPage;
        vm.nextPage = nextPage;
        vm.showAlert = showAlert;


        // Declarations
        function showAlert(vehi_id) {

            console.log("vehi_id", vehi_id);
            var confirm = $mdDialog.confirm()
                .title("Alerta")
                .textContent("¿Seguro que desea eliminar este vehículo?")
                .ariaLabel('Eliminar Vehículo')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok("Sí")
                .cancel("No");

            $mdDialog.show(confirm).then(function () {
                $http.delete(ApiEndpoint.vehicles.uri + "/" + vehi_id).then(function successCallback(res) {
                    console.log("Eliminado", res);
                }, function errorCallback(err) {
                    console.log("error de eliminar", err);
                });

            }, function () {
                //
            });
        }

        function gotoVehiclesDetail(id) {
            $state.go('app.administracion.vehiculos.detail', {
                id: id
            });
        }

        function gotoCreateVehicle() {
            $state.go('app.administracion.vehiculos.create');
        }

        function gotoMerge() {
            $state.go('app.administracion.vehiculos.merge');
        }

        function gotoUpload() {
            $state.go('app.administracion.vehiculos.upload');
        }

        // Get the vehicles filtered by string (not paginated)
        function getVehiclesByFilter() {
            $http.get(ApiEndpoint.vehicles.uri + "/" + ApiEndpoint.vehicles.search + "/" + vm.search).then(
                function success(result) {
                    if (result.data.length > 0) {
                        vm.vehicles = result.data;
                    } else {
                        $mdDialog.show($mdDialog.confirm()
                            .title("Info")
                            .textContent("No hay información para esta consulta")
                            .clickOutsideToClose(true)
                            .ok("Ok"))
                    }

                },
                function errorCallback(err) {
                    console.log("error de filtrado", err);
                }
            );
        }

        // Get the vehicles by page and limit (without filter)
        function getVehiclesPaginated() {
            $http.get(ApiEndpoint.vehicles.uri + '/' + vm.paginationData.currentPage + '/' + vm.paginationData.rowsByPage).then(
                function success(result) {
                    if (result && result.data && result.data.docs) {
                        vm.vehicles = result.data.docs;
                    } else {
                        $('#' + vm.dtInstance.id).destroy();
                        console.log(vm.dtInstance);
                    }
                },
                function errorCallback(err) {
                    console.log("error paginando", err);
                }
            );
        }

        // Update the value of current page and get the vehicles data
        function nextPage() {
            if (vm.paginationData.currentPage !== vm.paginationData.pagesLength) {
                vm.paginationData.currentPage++;
                getVehiclesPaginated();
            }
        }

        // Update the value of current page and get the vehicles data
        function previousPage() {
            if (vm.paginationData.currentPage !== 1) {
                vm.paginationData.currentPage--;
                getVehiclesPaginated();
            }
        }
    }
})();