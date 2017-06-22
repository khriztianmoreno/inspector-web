(function () {
    'use strict';

    angular
        .module('app.pages.consolidado')
        .controller('ConsolidadoDetailController', ['Review', 'DataPDF', '$state', function(Review, DataPDF, $state) {
            var vm = this;

            // Data
            vm.review = Review.data;
            vm.invoice = null;
            vm.checksFalse = [];
            vm.checksTrue = [];
            vm.checksTrueDivided = [[],[],[],[]];
            vm.categories = {};
            vm.pdfItems = [];
            vm.DataPDF = DataPDF.data;
            vm.pdfGenerated = {
                header: { 
                    text: "REVISIÓN " + vm.review.type,
                    style: 'header', 
			        alignment: 'center'
                },
                footer: {         
			        text: 'Firma CDA', 
			        style: 'header', 
			        alignment: 'center'
                },
                content: [
                    {
                        alignment: 'justify',
                        columns: [
                            {
                                style: 'invoiceTable',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [
                                            {text: 'QUIÉN REVISÓ EL VEHÍCULO', style: 'titleHead', margin: [5, 0, 5, 0]}
                                        ],
                                        ['Compañia: Hola mundo'],
                                        ['Sede: Bogota'],
                                        ['Fecha de vencimiento: 12/12/12']
                                    ]
                                },
                                layout: 'headerLineOnly'
                            },
                            {
                                style: 'invoiceTable',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [
                                            {text: 'DUEÑO DEL VEHÍCULO', style: 'titleHead', margin: [5, 0, 5, 0] }
                                        ],
                                        ['Compañia: Hola mundo'],
                                        ['Sede: Bogota']
                                    ]
                                },
                                layout: 'headerLineOnly'
                            },
                            {
                                style: 'invoiceTable',
                                table: {
                                        headerRows: 0,
                                        body: [
                                                ['Placa: MAY 311'],
                                                ['Marca: Aveo'],
                                                ['Línea: Recta'],
                                                ['Motor: Bonito'],
                                                ['Chasis: Redondito'],
                                                ['VIN: ASDASD12ASD12']
                                        ]
                                },
                                layout: 'noBorders'
                            },
                            {
                                style: 'invoiceTable',
                                table: {
                                        headerRows: 0,
                                        widths: ['*'],
                                        body: [
                                            [{text: '20160932398', margin: [5, 15, 5, 15], alignment: 'center'}],
                                            [{text: 'ALERTA', margin: [5, 15, 5, 15], alignment: 'center', fillColor: '#fb8c00', color: 'white'}],
                                        ]
                                },
                                layout: 'noBorders'
                            }
                        ],
                        columnGap: 7
                    },
                    {
                        style: 'invoiceTable',
                        table: {
                            headerRows: 0,
                            widths: ['*'],
                            body: [
                                [{text: 'Revisiones malas', style:'badReviewTitle'}]
                            ]
                        },
                        layout: 'noBorders',
                        margin: [0, 20, 0, 0]
                    },
                    {
                        style: 'invoiceTable',
                        table: {
                            widths: ['auto', '20%', '*', '*'],
                            body: [
                                [
                                    {text: 'CÓDIGO', style: 'header'}, 
                                    {text: 'ITEM', style: 'header'},
                                    {text: 'CATEGORÍA', style: 'header'},
                                    {text: 'OBSERVACIÓN', style: 'header'}
                                ],
                                ['LUC001', 'Luces', 'Color Luces', 'Luces en estrober, cambiar'],
                                ['LUC002', 'Luces', 'Color estacionamiento', 'Derecha trasera no funciona']
                            ]
                        },
                        layout: 'lightHorizontalLines',
                        margin: [0, 0, 0, 20]
                    },
                    {
                        style: 'invoiceTable',
                        table: {
                            headerRows: 0,
                            widths: ['*'],
                            body: [
                                [{text: 'Revisiones buenas', style:'goodReviewTitle'}]
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['*'],
                                    headerRows: 0,
                                    body: [
                                        [{
                                            style: 'goodTable',
                                            table: {
                                                widths: ['*'],
                                                headerRows: 1,
                                                body: [
                                                    [
                                                        {text: 'Luces', style: 'goodTableTitle'}
                                                    ],
                                                    ['LUC003 Luces direccionales'],
                                                    ['LUC003 Luces bajas y altas'],
                                                    ['LUC003 Luces reversa'],
                                                    ['LUC003 Luces freno']
                                                ]
                                            },
                                            layout: 'noBorders'                                            
                                        }],
                                        [{
                                            style: 'goodTable',
                                            table: {
                                                widths: ['*'],
                                                headerRows: 1,
                                                body: [
                                                    [
                                                        {text: 'Luces', style: 'goodTableTitle'}
                                                    ],
                                                    ['LUC003 Luces direccionales'],
                                                    ['LUC003 Luces bajas y altas'],
                                                    ['LUC003 Luces reversa'],
                                                    ['LUC003 Luces freno']
                                                ]
                                            },
                                            layout: 'noBorders'                                            
                                        }],
                                        [{
                                            style: 'goodTable',
                                            table: {
                                                widths: ['*'],
                                                headerRows: 1,
                                                body: [
                                                    [
                                                        {text: 'Luces', style: 'goodTableTitle'}
                                                    ],
                                                    ['LUC003 Luces direccionales'],
                                                    ['LUC003 Luces bajas y altas'],
                                                    ['LUC003 Luces reversa'],
                                                    ['LUC003 Luces freno']
                                                ]
                                            },
                                            layout: 'noBorders'                                            
                                        }]
                                    ]
                                },
                                layout: 'noBorders'
                            },
                            {
                                table: {
                                    widths: ['*'],
                                    headerRows: 0,
                                    body: [
                                        [{
                                            style: 'goodTable',
                                            table: {
                                                widths: ['*'],
                                                headerRows: 1,
                                                body: [
                                                    [
                                                        {text: 'Luces', style: 'goodTableTitle'}
                                                    ],
                                                    ['LUC003 Luces direccionales'],
                                                    ['LUC003 Luces bajas y altas'],
                                                    ['LUC003 Luces reversa'],
                                                    ['LUC003 Luces freno']
                                                ]
                                            },
                                            layout: 'noBorders'                                            
                                        }],
                                        [{
                                            style: 'goodTable',
                                            table: {
                                                widths: ['*'],
                                                headerRows: 1,
                                                body: [
                                                    [
                                                        {text: 'Luces', style: 'goodTableTitle'}
                                                    ],
                                                    ['LUC003 Luces direccionales'],
                                                    ['LUC003 Luces bajas y altas'],
                                                    ['LUC003 Luces reversa'],
                                                    ['LUC003 Luces freno']
                                                ]
                                            },
                                            layout: 'noBorders'                                            
                                        }],
                                        [{
                                            style: 'goodTable',
                                            table: {
                                                widths: ['*'],
                                                headerRows: 1,
                                                body: [
                                                    [
                                                        {text: 'Luces', style: 'goodTableTitle'}
                                                    ],
                                                    ['LUC003 Luces direccionales'],
                                                    ['LUC003 Luces bajas y altas'],
                                                    ['LUC003 Luces reversa'],
                                                    ['LUC003 Luces freno']
                                                ]
                                            },
                                            layout: 'noBorders'                                            
                                        }]
                                    ]
                                },
                                layout: 'noBorders'
                            },
                            {
                                table: {
                                    widths: ['*'],
                                    headerRows: 0,
                                    body: [
                                        [{
                                            style: 'goodTable',
                                            table: {
                                                widths: ['*'],
                                                headerRows: 1,
                                                body: [
                                                    [
                                                        {text: 'Luces', style: 'goodTableTitle'}
                                                    ],
                                                    ['LUC003 Luces direccionales'],
                                                    ['LUC003 Luces bajas y altas'],
                                                    ['LUC003 Luces reversa'],
                                                    ['LUC003 Luces freno']
                                                ]
                                            },
                                            layout: 'noBorders'                                            
                                        }],
                                        [{
                                            style: 'goodTable',
                                            table: {
                                                widths: ['*'],
                                                headerRows: 1,
                                                body: [
                                                    [
                                                        {text: 'Luces', style: 'goodTableTitle'}
                                                    ],
                                                    ['LUC003 Luces direccionales'],
                                                    ['LUC003 Luces bajas y altas'],
                                                    ['LUC003 Luces reversa'],
                                                    ['LUC003 Luces freno']
                                                ]
                                            },
                                            layout: 'noBorders'                                            
                                        }],
                                        [{
                                            style: 'goodTable',
                                            table: {
                                                widths: ['*'],
                                                headerRows: 1,
                                                body: [
                                                    [
                                                        {text: 'Luces', style: 'goodTableTitle'}
                                                    ],
                                                    ['LUC003 Luces direccionales'],
                                                    ['LUC003 Luces bajas y altas'],
                                                    ['LUC003 Luces reversa'],
                                                    ['LUC003 Luces freno']
                                                ]
                                            },
                                            layout: 'noBorders'                                            
                                        }]
                                    ]
                                },
                                layout: 'noBorders'
                            },
                            {
                                table: {
                                    widths: ['*'],
                                    headerRows: 0,
                                    body: [
                                        [{
                                            style: 'goodTable',
                                            table: {
                                                widths: ['*'],
                                                headerRows: 1,
                                                body: [
                                                    [
                                                        {text: 'Luces', style: 'goodTableTitle'}
                                                    ],
                                                    ['LUC003 Luces direccionales'],
                                                    ['LUC003 Luces bajas y altas'],
                                                    ['LUC003 Luces reversa'],
                                                    ['LUC003 Luces freno']
                                                ]
                                            },
                                            layout: 'noBorders'                                            
                                        }],
                                        [{
                                            style: 'goodTable',
                                            table: {
                                                widths: ['*'],
                                                headerRows: 1,
                                                body: [
                                                    [
                                                        {text: 'Luces', style: 'goodTableTitle'}
                                                    ],
                                                    ['LUC003 Luces direccionales'],
                                                    ['LUC003 Luces bajas y altas'],
                                                    ['LUC003 Luces reversa'],
                                                    ['LUC003 Luces freno']
                                                ]
                                            },
                                            layout: 'noBorders'                                            
                                        }],
                                        [{
                                            style: 'goodTable',
                                            table: {
                                                widths: ['*'],
                                                headerRows: 1,
                                                body: [
                                                    [
                                                        {text: 'Luces', style: 'goodTableTitle'}
                                                    ],
                                                    ['LUC003 Luces direccionales'],
                                                    ['LUC003 Luces bajas y altas'],
                                                    ['LUC003 Luces reversa'],
                                                    ['LUC003 Luces freno']
                                                ]
                                            },
                                            layout: 'noBorders'                                            
                                        }]
                                    ]
                                },
                                layout: 'noBorders'
                            }
                        ],
                        columnGap: 5
                    }
                ],
                styles: {
                    header: {
                        bold: true,
                        color: '#000',
                        fontSize: 11
                    },
                    invoiceTable: {
                        color: '#666',
                        fontSize: 10
                    },
                    titleHead: {
                        fontSize: 11,
                        bold: true,
                        fillColor:'#c1c1c1',  
                        alignment: 'center'
                    },
                    goodTableTitle: {
                        fillColor: 'grey',
                        color: 'white',
                        alignment: 'center'
                    },
                    goodTable: {
                        color: '#666',
                        fontSize: 9
                    },
                    badReviewTitle: {
                        margin: [5, 10, 5, 10], 
                        alignment: 'center', 
                        fillColor: '#fb8c00', 
                        color: 'white',
                        bold: true,
                        fontSize: 16
                    },
                    goodReviewTitle: {
                        margin: [5, 10, 5, 10], 
                        alignment: 'center', 
                        fillColor: 'green', 
                        color: 'white',
                        bold: true,
                        fontSize: 16
                    }
                }
            };

            angular.forEach(vm.review.result.check, function(check, key) {
                check["key"] = key;
                check["checksTrue"] = [];
                angular.forEach(check.fields, $.proxy(function(field, key) {
                    if (field.value == "TRUE") {
                        this.checksTrue.push(field);
                        vm.categories[this.categorie] = this.checksTrue;
                        vm.checksTrue.push(field)
                    } else {
                        vm.checksFalse.push(field);
                        //vm.pdfGenerated.content[1].table.body.push([field.code, field.name, field.comment.substring(0,100)]);
                    }      
                }, check));
            });
            for (var key=0, divider = Math.floor(vm.checksTrue.length / 4), i = 0; key < vm.checksTrue.length; key++) {
                //console.log("divider*3: ", divider*4, "key: ", key,  "module: ", key%divider, "i: ", i);
                //vm.checksTrueDivided[i].push([vm.checksTrue[key].code, vm.checksTrue[key].name]); 
                //vm.pdfGenerated.content[3].columns[i].table.body.push([vm.checksTrue[key].code, vm.checksTrue[key].name]); 
                if (key < divider*4 && key%divider == 0 && key != 0) {
                    i++
                }
            }

            //Helpers
            var sortChecks = function(a, b) {
                if (a.value < b.value)
                    return -1;
                if (a.value > b.value)
                    return 1;
                return 0;
            };
            //vm.checksToShow = vm.checks.sort(sortChecks);

            vm.gotoConsolidado = function() {
                $state.go('app.consolidado');
            }


            vm.openPdf = function(vm) {
                //vm.pdf.autoPrint();
                //vm.pdf.output("dataurlnewwindow", {});
                pdfMake.createPdf(vm.DataPDF[0]).open();
            };
            
            vm.downloadPdf = function() {
                pdfMake.createPdf(vm.DataPDF[0]).download();
            };
            // Methods

        }]);    
})();
