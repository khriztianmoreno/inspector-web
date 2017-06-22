(function(){
    'use strict';

    angular
        .module('app.administracion')
        .controller('UploadVehiclesController', UploadVehiclesController);

    function UploadVehiclesController(XLSXReaderService, $scope){
        var vm = this;
        vm.cellsMap = {
            A: "model",
            B: "brand",
            C: "cyl",
            D: "color",
            E: "bodyWork"
        };
        vm.data = {};

        //Methods
        vm.checkMatrix = function(ref) {
            var myRef = ref.split(":");

            return {
                firstColumn: myRef[0].charCodeAt(0),
                lastColumn : myRef[1].charCodeAt(0),
                firstRow : parseInt(myRef[0].charAt(1)) + 1,
                lastRow : parseInt(myRef[1].charAt(1))
            }
        };

        $scope.read = function (workbook) {
            /* DO SOMETHING WITH workbook HERE */
            var sheetNameList = workbook.SheetNames;

            sheetNameList.forEach(function (y) { /* iterate through sheets */
                var worksheet = workbook.Sheets[y],
                    matrixValues = vm.checkMatrix(worksheet["!ref"]),
                    values = [],
                    column = "";

                for (var row = matrixValues.firstRow; row < matrixValues.lastRow + 1; row++) {
                    var lines = {};
                    for(var j = matrixValues.firstColumn; j < matrixValues.lastColumn + 1; j++) {
                        column = String.fromCharCode(j);
                        lines[vm.cellsMap[column]] = worksheet[column + row].v; 
                    }
                    values.push(lines);
                }

                vm.data[y] = values;
            });

            debugger;
        }

        $scope.error = function (e) {
            /* DO SOMETHING WHEN ERROR IS THROWN */
            console.log(e);
            debugger;
        }

    }


})();