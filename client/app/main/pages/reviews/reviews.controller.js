(function() {
  'use strict';

  angular
    .module('app.inspections')
    .controller('InspectionsController', ['$document', '$scope', '$rootScope', '$mdDialog', '$mdSidenav',
                'Review', 'ReviewService', 'Auth', 'VehicleService', '$state', '$stateParams', '$q',
                'TrackingService',
    function($document, $scope, $rootScope, $mdDialog, $mdSidenav, Review,
              ReviewService, Auth, VehicleService, $state, $stateParams, $q,
              TrackingService) {
      var vm = this;

      vm.categorie = Review.data;
      vm.tasks = [];
      vm.tags = [];
      vm.project2 = null;
      vm.vehicle = JSON.parse(ReviewService.getLocalVehicle());
      vm.getCurrentUser = Auth.getCurrentUser();


      //init

      var checks = vm.categorie.check;
      vm.project2= {
        "id": vm.categorie._id,
        "type": vm.categorie.type,
        "tags": [],
        "tasks": [],
        "name": vm.categorie.name
      }

      for (var check = 0; check < checks.length; check++) {
        var tasks = vm.project2.tasks.length;
        var items = vm.categorie.check[check].items;

        vm.project2.tags.push({
          "id": check,
          "color": checks[check].category[0].color,
          "label": checks[check].category[0].description,
          "name": checks[check].category[0].description
        });

        for (var item = 0; item < items.length; item++) {

          switch (items[item].type) {
            case 'PASS/FAIL':
              vm.project2.tasks.push({
                "title": items[item].name["es"].description,
                "id": item,
                "notes": null,
                "photos": [],
                "code": items[item].code,
                "type": items[item].type,
                "valueSelected": 'PASS',
                "starred": false,
                "tags": [{
                  "id": check,
                  "name": checks[check].category[0].description,
                  "label": checks[check].category[0].description,
                  "color": checks[check].category[0].color
                }],
                "values":items[item].values
              });
            break;
            case 'SELECT':
              vm.project2.tasks.push({
                "title": items[item].name["es"].description,
                "id": item,
                "notes": null,
                "photos": [],
                "code": items[item].code,
                "type": items[item].type,
                "starred": false,
                "tags": [{
                  "id": check,
                  "name": checks[check].category[0].description,
                  "label": checks[check].category[0].description,
                  "color": checks[check].category[0].color
                }],
                "values":items[item].values
              });
            break;
            case 'TEXT':
              vm.project2.tasks.push({
                "title": items[item].name["es"].description,
                "id": item,
                "notes": null,
                "photos": [],
                "code": items[item].code,
                "type": items[item].type,
                "valueSelected": null,
                "starred": false,
                "tags": [{
                  "id": check,
                  "name": checks[check].category[0].description,
                  "label": checks[check].category[0].description,
                  "color": checks[check].category[0].color
                }],
                "values":[]
              });
            break;
          }
        }
      }

      vm.tags = vm.project2.tags;
      vm.tasks = vm.project2.tasks;

      vm.completed = [];
      vm.colors = ['blue', 'blue-grey', 'orange', 'pink', 'purple'];
      vm.selectedFilter = {
        filter: 'Start Date',
        dueDate: 'Next 3 days'
      };

      // Tasks will be filtered against these models
      vm.taskFilters = {
        search: '',
        tags: [],
        completed: '',
        deleted: false,
        important: '',
        starred: ''
      };
      vm.taskFiltersDefaults = angular.copy(vm.taskFilters);
      vm.showAllTasks = true;

      vm.taskOrder = '';
      vm.taskOrderDescending = false;

      vm.sortableOptions = {
        handle: '.handle',
        forceFallback: true,
        ghostClass: 'todo-item-placeholder',
        fallbackClass: 'todo-item-ghost',
        fallbackOnBody: true,
        sort: true
      };
      vm.msScrollOptions = {
        suppressScrollX: true
      };

      // Methods
      vm.preventDefault = preventDefault;
      vm.openTaskDialog = openTaskDialog;
      vm.toggleCompleted = toggleCompleted;
      vm.toggleSidenav = toggleSidenav;
      vm.toggleFilter = toggleFilter;
      vm.toggleFilterWithEmpty = toggleFilterWithEmpty;
      vm.resetFilters = resetFilters;
      vm.toggleCategoryFilter = toggleCategoryFilter;
      vm.isTagFilterExists = isTagFilterExists;

      vm.saveInspections = function (work) {
        var itemSave ={
          inspectionId: $stateParams.id,
          cost: vm.vehicle.cost || 1,
          customer: vm.vehicle.customer,
          vehicle : {
            localId : vm.vehicle._id,
            plate : vm.vehicle.plate.number,
            class: vm.vehicle.vehicleData.class,
            mileage: vm.vehicle.vehicleData.mileage //Para saber con cual kilometraje se hizo esa revision
          },
          userReview : {
            localId : vm.getCurrentUser._id,
            name : vm.getCurrentUser.name
          },
          result:{
            check: []
          }
        };

        resolveItemImages(work)
          .then(function () {
            var checks = buildChecks(work);
            itemSave.result.check = checks;
            return $q.all($stateParams.images);
          })
          .then(function (values) {
            const images = [];
            values.forEach(function (img) {
              images.push(img.image_url)
            });

            itemSave.result.images = images;
            return ReviewService.save(itemSave);
          })
          .then(function (res) {
            var revId = res._id;
            if (revId) {
              TrackingService.addAlert(revId);
            }
            return res;
          })
          .then(function (res) {
            if (res._id) {
              //Actualizar vehiculo con el id de la revision
              var _review ={
                type: work.type,
                localId: res._id,
                mileage: vm.vehicle.vehicleData.mileage
              };

              delete vm.vehicle.cost;

              vm.vehicle.reviews.push(_review);

              VehicleService.update(vm.vehicle).then(function(res){
                if (res._id) {
                  //Remove del storage
                  ReviewService.deleteLocalVehicle('mobi-vehicle');

                  var alert = $mdDialog.alert()
                      .title('Revisión guardada')
                      .htmlContent('La revisión realizada al vehículo <b>'+
                        vm.vehicle.plate.number + '</b> fue registrada.')
                      .ariaLabel('save inspection')
                      .ok('OK');

                  $mdDialog.show(alert);

                  $state.go('app.reviews');
                }
              });

            }
          });

      };

      init();

      //////////

      /**
       * Initialize the controller
       */
      function init() {
        console.log("start inspections");
      }

      /**
       * Prevent default
       *
       * @param e
       */
      function preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
      }

      /**
       * Open new task dialog
       *
       * @param ev
       * @param task
       */
      function openTaskDialog(ev, task) {
        $mdDialog.show({
          controller: 'InspectionsTaskDialogController',
          controllerAs: 'vm',
          templateUrl: 'app/main/pages/reviews/dialogs/task/task-dialog.html',
          parent: angular.element($document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          locals: {
            Task: task,
            Tasks: vm.tasks,
            event: ev
          }
        });
      }

      /**
       * Toggle completed status of the task
       *
       * @param task
       * @param event
       */
      function toggleCompleted(task, event) {
        event.stopPropagation();
        task.completed = !task.completed;
      }

      /**
       * Toggle sidenav
       *
       * @param sidenavId
       */
      function toggleSidenav(sidenavId) {
        $mdSidenav(sidenavId).toggle();
      }

      /**
       * Toggles filter with true or false
       *
       * @param filter
       */
      function toggleFilter(filter) {
        vm.taskFilters[filter] = !vm.taskFilters[filter];

        checkFilters();
      }

      /**
       * Toggles filter with true or empty string
       * @param filter
       */
      function toggleFilterWithEmpty(filter) {
        if (vm.taskFilters[filter] === '') {
          vm.taskFilters[filter] = true;
        } else {
          vm.taskFilters[filter] = '';
        }

        checkFilters();
      }

      /**
       * Reset filters
       */
      function resetFilters() {
        vm.showAllTasks = true;
        vm.taskFilters = angular.copy(vm.taskFiltersDefaults);
      }

      /**
       * Check filters and mark showAllTasks
       * as true if no filters selected
       */
      function checkFilters() {
        vm.showAllTasks = !!angular.equals(vm.taskFiltersDefaults, vm.taskFilters);
      }

      /**
       * Toggles tag filter
       *
       * @param tag
       */
      function toggleCategoryFilter(tag) {
        vm.taskFilters.tags[0] = tag;

        checkFilters();
      }

      /**
       * Returns if tag exists in the tagsFilter
       *
       * @param tag
       * @returns {boolean}
       */
      function isTagFilterExists(tag) {
        return vm.taskFilters.tags.indexOf(tag) > -1;
      }

      function resolveItemImages(work) {
        var itemImagePromises = [];

        _.forEach(work.tags, function (tag, k) {
          _.forEach(work.tasks, function (task, v) {
            if (task.tags[0].name === tag.name) {
              if (task.photos && task.photos.promise) {
                itemImagePromises.push(task.photos.promise);
              }
            }
          })
        });

        return $q.all(itemImagePromises);
      }

      function buildChecks(work) {
        var checks = [];

        _.forEach(work.tags, function(tag, k){
          var check = {
            category: tag.name,
            fields: []
          };
          _.forEach(work.tasks, function (task, v) {
            if (task.tags[0].name === tag.name) {
              switch (task.type) {
                case 'PASS/FAIL':
                  check.fields.push({
                    name : task.title,
                    value : task.valueSelected,
                    image : task.photos.uploadedUrl || null,
                    comment : task.notes
                  });
                break;
                case 'SELECT':
                  check.fields.push({
                    name : task.title,
                    localId: task.valueSelected.code,
                    value : task.valueSelected.name['es'].description,
                    image : task.photos.uploadedUrl || null,
                    comment : task.notes
                  });
                break;
              }
            }
          });
          //Adicionamos la categoria con sus respuestas
          checks.push(check);
        });

        return checks;
      }

    }]);
})();
