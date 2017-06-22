(function ()
{
    'use strict';

    angular
        .module('app.pages.tablero')
        .controller('TableroGerencialController', TableroGerencialController);

    /** @ngInject */
    function TableroGerencialController($filter, Auth, $mdSidenav, TableroData, DashBoard, TotalByDays)
    {
        var vm = this;

        vm.dashBoard = DashBoard.data;
        vm.totalByDays = TotalByDays.data;
        vm.getCurrentUser = Auth.getCurrentUser();

        var chart = {
            series: [vm.getCurrentUser.customer.localName],
            data  : [],
            options: {
              scales: {
                yAxes: [
                  {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                  }
                ]
              }
            }
        };

        // Data
        vm.data = TableroData;
        vm.projects = vm.data.projects;


        init();

        /**
         *
         */
        function init(){
          if (vm.totalByDays) {
            console.log(new Date().toLocaleString());
            var data = _.map(vm.totalByDays, 'reviews'),
                _labels =  _.map(vm.totalByDays, function(o){
                    return $filter('date')(o.date, 'mediumDate')
                });

            chart.data.push(data);
            //chart.data.push([8,3,3,9, 10, 5]);
            chart.labels  = _labels;
          }

          vm.lineChart = chart;
        }


        // Widget 1
        vm.widget1 = vm.data.widget1;

        // Widget 2
        vm.widget2 = vm.data.widget2;

        // Widget 3
        vm.widget3 = vm.data.widget3;

        // Widget 4
        vm.widget4 = vm.data.widget4;

        //////////
        vm.selectedProject = vm.projects[0];

    }

})();
