(function() {
    'use strict';

    angular
        .module('app.pages.flotaWrite')
        .controller('MiFlotaWriteController', MiFlotaWriteController);

    function MiFlotaWriteController($log, $mdDialog, $http, $q, ApiEndpoint, soatOriginsData, infoVehicles) {
        var vm = this;

        var tabs = [
                { title: "SOAT", content: "" },
                { title: "RTM", content: "" },
                /*{ title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element." },
                { title: 'Four', content: "If you set the selected tab binding to -1, it will leave no tab selected." },
                { title: 'Five', content: "If you remove a tab, it will try to select a new one." },
                { title: 'Six', content: "There's an ink bar that follows the selected tab, you can turn it off if you want." },
                { title: 'Seven', content: "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab." },
                { title: 'Eight', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!" },
                { title: 'Nine', content: "If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs." },
                { title: 'Ten', content: "If you're still reading this, you should just go check out the API docs for tabs!" }*/
            ],
            selected = null,
            previous = null;

        // Data
        //Datos formulario autocomplete
        vm.allCities = soatOriginsData.data[0].values;
        vm.allInfoVehicles = infoVehicles.data[0].values;

        //*************************************************
        //Vars

        //Variables para controlar el contenido del formulario vertical				
        vm.allInfoBrands = {};
        vm.allInfoLines = [];
        vm.verticalStepper = {
            step1: {},
            step2: {},
            step3: {},
            step4: {},
            step5: {}
        };
        vm.verticalStepper.step3.document_active = new Array(2).fill(true);
        vm.formWizard = {};

        //*************************************************

        //Variables campos de Autocompletar
        vm.noCache = true;

        vm.allCenters = "Centro1, Centro2, Centro3";
        vm.allCompanies = "SURAMERICANA, SEGUROS BOLÍVAR, ALLIANZ";
        vm.allCDAs = "Ajustev";
        vm.allSedes = "Ajustev-Medellín";
        vm.allFlotas = [{
            name: "AUTONORTE S.A",
            id: "575e178aca0cc848484923c4"
        }, {
            name: "RADIO TAXI AEROPUERTO",
            id: "575e178aca0cc848484923c5"
        }, {
            name: "RENTATUREX S.A",
            id: "575e178aca0cc848484923c6"
        }]; //"Flota1, Flota2, Flota3";
        vm.diagnosticsCenters = loadAll("center");
        vm.insuranceCompanies = loadAll("company");
        vm.cdas = loadAll("cda");
        vm.sedes = loadAll("sede");
        vm.flotas = loadAll("flota");
        vm.city_origins = loadAll("plate_origin");
        vm.vehicleData_classes = loadAll("vehicleData_class");
        vm.vehicleData_brands = [];
        vm.vehicleData_lines = [];
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange = searchTextChange;
        vm.newDiagnosticsCenter = newDiagnosticsCenter;
        vm.newInsuranceCompany = newInsuranceCompany;

        //Variables formulario con Tabs
        vm.tabs = tabs;
        vm.selectedIndex = 0;

        // ###############################
        //       Internal methods
        // ###############################

        /**
         * Métodos para campos de autocompletar... use $timeout to simulate
         * remote dataservice call.
         */

        //Agregar nuevos campos al autocomplete
        function newDiagnosticsCenter(center) {
            alert("Sorry! ", center);
        };

        function newInsuranceCompany(state) {
            alert("Sorry! ", state);
        };

        function newVehiClass(className) {
            alert("Sorry! ", className);
        };

        //Funciones para la búsqueda
        function querySearch(query, in_type) {
            var array = getArraySearch(in_type);
            return (query ? array.filter(createFilterFor(query)) : array);
        };

        function searchTextChange(text) {
            //$log.info('Text changed to ' + text);
        };

        function selectedItemChange(item, type) {
            $log.info("Item changed to " + JSON.stringify(item));

            try {
                if (type === "plate_origin") {
                    vm.verticalStepper.step1.origin = item.value;

                } else if (type === "vehicleData_class") {

                    vm.verticalStepper.step2.class = item.value;
                    vm.vehicleData_brand.selectedItem = '';
                    vm.vehicleData_brand.searchText = '';
                    vm.vehicleData_line.selectedItem = '';
                    vm.vehicleData_line.searchText = '';
                    vm.vehicleData_brands = [];

                    angular.forEach(vm.allInfoVehicles, function(element) {
                        if (element.class === item.value) {
                            vm.allInfoBrands = element.brands;
                            vm.allInfoBrandsOrdered = {};
                            var keys = Object.keys(vm.allInfoBrands);
                            keys.sort();

                            for (var i = 0; i < keys.length; i++) {
                                var k = keys[i];
                                vm.allInfoBrandsOrdered[k] = vm.allInfoBrands[k];
                            }
                        }
                    });

                    angular.forEach(vm.allInfoBrandsOrdered, function(value, key) {
                        vm.vehicleData_brands.push({
                            value: key,
                            display: key,
                            nameLower: key.toLowerCase()
                        });
                    });

                } else if (type === "vehicleData_brand") {

                    vm.verticalStepper.step2.brand = item.value;
                    vm.vehicleData_line.selectedItem = '';
                    vm.vehicleData_line.searchText = '';
                    vm.vehicleData_lines = [];

                    angular.forEach(vm.allInfoBrands, function(value, key) {
                        if (key === item.value) {
                            vm.allInfoLines = value;
                        }
                    });

                    angular.forEach(vm.allInfoLines, function(element) {
                        element.line = (typeof(element.line) === "number") ? element.line.toString() : element.line;
                        element.line2 = (typeof(element.line2) === "number") ? element.line2.toString() : element.line2;
                        element.line3 = (typeof(element.line3) === "number") ? element.line3.toString() : element.line3;
                        var displayVar = element.line + ' ' + element.line2 + ' ' + element.line3;
                        vm.vehicleData_lines.push({
                            value: element._id,
                            display: displayVar,
                            nameLower: displayVar.toLowerCase()
                        });
                    });
                } else if (type === "vehicleData_line") {
                    vm.verticalStepper.step2.line = item.value;
                } else if (type === "document_origin") {
                    vm.verticalStepper.step4.owner_document_origin = item.value;
                } else if (type === "cda") {
                    vm.sede.searchText = '';
                    vm.flota.searchText = '';
                    vm.verticalStepper.step1.cda = item.value;
                } else if (type === "sede") {
                    vm.flota.searchText = '';
                    vm.verticalStepper.step1.sede = item.value;
                } else if (type === "flota") {
                    vm.verticalStepper.step1.flota = item.value;
                    vm.verticalStepper.step1.flota_name = item.display;
                } else if (type === "center") {
                    vm.verticalStepper.step3.center = item.value;
                } else if (type === "company") {
                    vm.verticalStepper.step3.company = item.value;
                }


            } catch (err) {
                console.log("Error in  change: ", err);
            }
        };

        function selectedItemChangeWithIndex(item, index) {

            try {
                $log.info("Item changed to " + JSON.stringify(item));
                $log.log("Current index: ", index);
            } catch (err) {
                console.log("Error in  change: ", err);
            }
        };

        /**
         * Cargar los vectores con listas de objetos key/value para el manejo del display, búsqueda y los valores del registro seleccionado 
         */
        function loadAll(in_type) {

            var allType = defineType(in_type);

            return allType.map(function(val, key) {
                if (in_type === "plate_origin" || in_type === "document_origin" || in_type === "flota") {
                    return {
                        value: val.id,
                        display: val.name,
                        nameLower: val.name.toLowerCase()
                    };
                } else if (in_type === "company" || in_type === "center" || in_type === "cda" || in_type === "sede") {
                    return {
                        value: val,
                        display: val,
                        nameLower: val.toLowerCase()
                    };
                } else if (in_type === "vehicleData_class") {
                    return {
                        value: val.class,
                        display: val.class,
                        nameLower: val.class.toLowerCase()
                    };
                }
            });
        };

        //Función para convertir un parámetro de un determinado campo autocomplete y devuelve vector de datos para cargar el formulario con los datos...
        function defineType(in_type) {
            var allType;

            switch (in_type) {
                case "center":
                    allType = vm.allCenters.split(', ');
                    break;
                case "company":
                    allType = vm.allCompanies.split(', ');
                    break;
                case "cda":
                    allType = vm.allCDAs.split(', ');
                    break;
                case "sede":
                    allType = vm.allSedes.split(', ');
                    break;
                case "flota":
                    allType = vm.allFlotas;
                    break;
                case "plate_origin":
                    allType = vm.allCities;
                    break;
                case "document_origin":
                    allType = vm.allCities;
                    break;
                case "vehicleData_class":
                    allType = vm.allInfoVehicles;
                    break;
                case "vehicleData_brand":
                    allType = vm.allInfoBrands;
                    break;
                case "vehicleData_line":
                    allType = vm.allInfoLines;
                    break;
                default:
                    break;
            }
            return allType;
        };

        //Función para obtener el vector de datos para buscar el valor de autocompletar según el campo que se  esté filtrando: Aseguradoras, Centros de Diag., Ciudades...
        function getArraySearch(in_type) {
            var allType;

            switch (in_type) {
                case "center":
                    allType = vm.diagnosticsCenters;
                    break;

                case "company":
                    allType = vm.insuranceCompanies;
                    break;
                case "cda":
                    allType = vm.cdas;
                    break;
                case "sede":
                    allType = vm.sedes;
                    break;
                case "flota":
                    allType = vm.flotas;
                    break;
                case "plate_origin":
                    allType = vm.city_origins;
                    break;
                case "document_origin":
                    allType = vm.city_origins;
                    break;
                case "vehicleData_class":
                    allType = vm.vehicleData_classes;
                    break;
                case "vehicleData_brand":
                    allType = vm.vehicleData_brands;
                    break;
                case "vehicleData_line":
                    allType = vm.vehicleData_lines;
                    break;
                default:
                    break;
            }
            return allType;
        };
        /**
         * 
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(element) {
                return (element.nameLower.indexOf(lowercaseQuery) === 0);
            };
        };

        // ###############################
        //    Methods
        // ###############################

        vm.submitVerticalStepper = function(event) {
            // Show the model data in a dialog
            vm.showDataDialog(event, vm.verticalStepper);

            // Reset the form model
            vm.verticalStepper = {
                step1: {},
                step2: {},
                step3: {},
                step4: {},
                step5: {}
            };
        };

        vm.changeTab = function(index) {
            previous = selected;
            selected = tabs[index];
        };

        vm.addTab = function(title) {
            console.log("Nuevo TAB", title);
            var view = "view " || title + " Content View";
            tabs.push({ title: title, content: view, disabled: false });
        };

        vm.removeTab = function(tab) {
            var index = tabs.indexOf(tab);
            tabs.splice(index, 1);
        };

        vm.showDataDialog = function(ev, data) {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller: function(vm, $mdDialog, formWizardData) {
                    vm.formWizardData = formWizardData;
                    vm.closeDialog = function() {
                        $mdDialog.hide();
                    };
                },
                template: '<md-dialog>' +
                    '  <md-dialog-content><h1>You have sent the form with the following data</h1><div><pre>{{formWizardData | json}}</pre></div></md-dialog-content>' +
                    '  <md-dialog-actions>' +
                    '    <md-button ng-click="closeDialog()" class="md-primary">' +
                    '      Close' +
                    '    </md-button>' +
                    '  </md-dialog-actions>' +
                    '</md-dialog>',
                parent: angular.element('body'),
                targetEvent: ev,
                locals: {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        };

        vm.crearVehi = function() {

            var params = {
                vehicleData: {
                    model: vm.verticalStepper.step2.model, //{ type: Number, required: true },
                    brand: vm.verticalStepper.step2.brand,
                    cyl: vm.verticalStepper.step2.cyl, //{ type: Number, required: true },
                    color: vm.verticalStepper.step2.color,
                    bodyWork: vm.verticalStepper.step2.bodyWork,
                    service: vm.verticalStepper.step2.service,
                    class: vm.verticalStepper.step2.class,
                    line: vm.verticalStepper.step2.line,
                    capacity: vm.verticalStepper.step2.capacity,
                    fuel: vm.verticalStepper.step2.fuel,
                    motor: vm.verticalStepper.step2.motor,
                    serie: vm.verticalStepper.step2.serie,
                    chassis: vm.verticalStepper.step2.chassis,
                    vin: vm.verticalStepper.step2.vin,
                    mileage: vm.verticalStepper.step2.mileage, //{ type: Number },
                    owner: {
                        fullName: vm.verticalStepper.step4.fullName,
                        identification: {
                            number: vm.verticalStepper.step4.owner_document, //{ type: String, uppercase: true, required: true },
                            origin: vm.verticalStepper.step4.owner_document_origin
                        }
                    }
                },
                image: '',
                plate: {
                    number: vm.verticalStepper.step1.plate, //{ type: String, uppercase: true, required: true },
                    origin: vm.verticalStepper.step1.origin, //{ type: String, uppercase: true, required: true }
                },

                //####################################################################################################################
                //TODO: REEMPLAZAR ESTOS VALORES CUANDO EL LOGIN ESTÉ FUNCIONANDO
                //####################################################################################################################
                customer: {
                    localId: vm.verticalStepper.step1.flota,
                    localName: vm.verticalStepper.step1.flota_name,
                    channelId: "570bc12fd06265c01f6a83a1",
                    channelName: "AJUSTEV",
                    distributorId: "57a4bc5190e443b96229cced",
                    distributorName: "AJUSTEV MEDELLIN"
                },
                documents: []
            };

            if (vm.verticalStepper.step3.document_number[0] !== undefined) {
                params.documents[0] = {
                    type: "SOAT",
                    number: vm.verticalStepper.step3.document_number[0],
                    expeditionDate: vm.verticalStepper.step3.document_expeditionDate[0],
                    expirationDate: vm.verticalStepper.step3.document_expirationDate[0],
                    insuranceCompany: vm.verticalStepper.step3.company,
                    officeCode: vm.verticalStepper.step3.document_officeCode[0],
                    cost: vm.verticalStepper.step3.document_cost[0],
                    active: vm.verticalStepper.step3.document_active[0],
                }
            }
            if (vm.verticalStepper.step3.document_number[1] !== undefined) {
                params.documents[1] = {
                    type: "RTM",
                    number: vm.verticalStepper.step3.document_number[1],
                    expeditionDate: vm.verticalStepper.step3.document_expeditionDate[1],
                    expirationDate: vm.verticalStepper.step3.document_expirationDate[1],
                    diagnosticsCenter: vm.verticalStepper.step3.center,
                    officeCode: vm.verticalStepper.step3.document_officeCode[1],
                    cost: vm.verticalStepper.step3.document_cost[0],
                    active: vm.verticalStepper.step3.document_active[0],
                }
            }
            console.log("JSON", JSON.stringify(params));
            $http.post(ApiEndpoint.vehicles.uri, params).then(function successCallback(res) {
                console.log("creado", res);
            }, function errorCallback(err) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("error de creado", err);
            });
        }
    }
})();