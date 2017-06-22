(function() {
  'use strict';

  angular
    .module('app.administracion')
    .controller('CreateInspeccionController', CreateInspeccionController);

  /** @ngInject */
  function CreateInspeccionController($state, $mdDialog, $document, $mdSidenav,
    AnswerTypes, AnswerValues, InspectionTypes, InspectionService, Auth) {
    var vm = this;

    // Data
    vm.inspection = {
      name: null,
      type: null,
      periodicity: {},
      customer: {},
      check: []
    };
    vm.inspectionTypes = InspectionTypes.data[0].values;
    vm.optionsItems = AnswerTypes.data[0].values;
    vm.answerValues = AnswerValues.data[0].values;
    vm.filterCategory = null;
    vm.listType = 'all';
    vm.category = {};
    vm.options = {
      label: "Choose a color",
      default: "#f00",
      genericPalette: false,
      history: false
    };
    vm.disableNewCategoryButton = false;
    vm.showEditDeleteIcon = false;
    vm.showEditCategory = false;
    vm.visibleEdition = true;
    vm.showSaveInspection = true;
    vm.getCurrentUser = Auth.getCurrentUser();

    // Methods
    vm.toggleGroup = toggleGroup;
    vm.exists = exists;
    vm.changeAnswer = changeAnswer;
    vm.removeItem = removeItem;
    vm.duplicateItem = duplicateItem;
    vm.addItem = addItem;
    vm.addCategory = addCategory;
    vm.showCategoryName = showCategoryName;
    vm.toggleSidenav = toggleSidenav;
    vm.filterChange = filterChange;
    vm.resetFilters = resetFilters;
    vm.openCategoryDialog = openCategoryDialog;
    vm.closeDialog = closeDialog;
    vm.addNewGroup = addNewGroup;
    vm.saveCategory = saveCategory;
    vm.newCategory = newCategory;
    vm.removeCategory = removeCategory;
    vm.editCategory = editCategory;
    vm.editSaveCategory = editSaveCategory;
    vm.showEditInspection = showEditInspection;
    vm.cancelCategory = cancelCategory;
    vm.gotoInspection = gotoInspection;
    vm.saveInspectionData = saveInspectionData;
    vm.saveInspection = saveInspection;
    vm.saveItem = saveItem;
    vm.addAnswerOption = addAnswerOption;
    vm.deleteAnswerOption = deleteAnswerOption;

    //////////

    function deleteAnswerOption(answersList, index) {
      answersList.splice(index, 1);
    }

    /**
     * Add new answer option
     * @param {Array} list - All option answers
     */
    function addAnswerOption(list) {
      var newOption = {
        "name": {
          "es": {
            "language": "es",
            "description": ""
          }
        }
      };

      list.push(newOption);
    }

    /**
     * Guarda en db la inspeccion
     */
    function saveInspection(ev) {

      vm.inspection.type = vm.inspectionTypeSelected;
      vm.inspection.customer = {
        localId: vm.getCurrentUser.customer.localId,
        localName: vm.getCurrentUser.customer.localName
      };

      switch (vm.inspectionTypeSelected) {
        case 'PREVENTIVE':
          vm.inspection.periodicity = {
            "type": "MONTHLY",
            "value": 2
          }
          break;
        case 'ENLISTMENT':
          vm.inspection.periodicity = {
            "type": "DAILY",
            "value": 24
          }
          break;
        default:
          vm.inspection.periodicity = {};
          break;
      }

      if (vm.inspection.check.length === 0) {
        var confirm = $mdDialog.confirm()
          .title('Sin categorías')
          .textContent('¿Esta seguro que desea crear la inspección sin ninguna categoría?.')
          .ariaLabel('Confirm clean checks')
          .targetEvent(ev)
          .clickOutsideToClose(true)
          .parent(angular.element(document.body))
          .ok('Confirmar')
          .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
          createInspection();
        }, function() {
          console.log('You decided to keep your debt.');
        });
      } else {
        console.log(vm.inspection);
        createInspection();
      }


    }

    function saveItem(item) {
      console.log(item);
    }

    function createInspection() {
      InspectionService.save(vm.inspection).then(function(resp) {
        if (resp.code && resp.errmsg) {
          //ERRROR
          var alert = $mdDialog.alert()
            .title('Error')
            .htmlContent('No se pudo actualizar la inspección en este momento.')
            .ariaLabel('error user')
            .ok('Ok');

          $mdDialog.show(alert);
        } else {
          var alert = $mdDialog.alert()
            .title('Inspección creada')
            .htmlContent('El formato de la inspección ha sido creada de forma correcta.')
            .ariaLabel('save inspection')
            .ok('OK');

          $mdDialog.show(alert);
          $state.go('app.administracion.inspecciones');
        }
      });
    }

    function saveInspectionData() {
      vm.visibleEdition = false;
      vm.showSaveInspection = true;
    }

    function cancelCategory() {
      vm.category = {};
      vm.showNewCategory = false;
      vm.disableNewCategoryButton = false;
    }

    function showEditInspection() {
      vm.visibleEdition = true;
      vm.showSaveInspection = false;
    }

    function removeCategory() {
      if (vm.listType !== 'all') {
        _.remove(vm.inspection.check, function(c) {
          return c.category[0].description === vm.listType;
        })

        vm.filterCategory = null;
        vm.listType = 'all';
        vm.showEditDeleteIcon = false;
      }
    }

    //Mostramos el formulario de edicion
    // buscamos en el array la categoria
    // pasamos esa categoria al scope vm.category para ser editado
    function editCategory() {

      if (vm.listType !== 'all') {
        var categorySelected = _.find(vm.inspection.check, function(c) {
          return c.category[0].description === vm.listType;
        });
        vm.category = {
          name: categorySelected.category[0].description,
          color: categorySelected.category[0].color,
          items: categorySelected.items
        };
        vm.showNewCategory = true;
        vm.showEditCategory = true;
      }

    }

    function newCategory() {
      vm.showNewCategory = true;
      vm.disableNewCategoryButton = true;
    }

    function saveCategory() {
      var newGroup = {
        "category": [{
          "language": "es",
          "description": vm.category.name,
          "color": vm.category.color
        }],
        "items": []
      };

      vm.inspection.check.push(newGroup);

      //Filtrar inmediatamente la lista por la categoria creada
      vm.filterCategory = vm.category.name;
      vm.listType = vm.category.name;
      vm.disableNewCategoryButton = false;
      vm.showNewCategory = false;
      vm.category = {};
    }

    function editSaveCategory() {

      _.each(vm.inspection.check, function(c) {
        if (c.category[0].description === vm.listType) {
          c.category[0].description = vm.category.name;
          c.category[0].color = vm.category.color;

          vm.filterCategory = vm.category.name;
          vm.listType = vm.category.name;
          vm.showNewCategory = false;
        }
      })


    }

    function addNewGroup() {
      if (vm.newGroupName === '') {
        return;
      }
      debugger
      var newGroup = {
        "categorie": [{
          "language": "es",
          "description": vm.newGroupName,
          "color": "#"
        }],
        "items": []
      };

      vm.inspection.check.push(newGroup);
      vm.newGroupName = '';
    }

    /**
     * Open new category dialog
     *
     * @param ev
     * @param contact
     */
    function openCategoryDialog(ev) {
      $mdDialog.show({
        controller: 'CategoryDialogController',
        controllerAs: 'vm',
        templateUrl: 'app/main/pages/administracion/views/inspeccion/dialogs/add_category.html',
        parent: angular.element($document.find('#inspection--master')),
        targetEvent: ev,
        clickOutsideToClose: true
          /*locals             : {
              Contact : user,
              Contacts: vm.users
          }*/
      });
    }

    function closeDialog() {
      $mdDialog.hide();
    }

    /**
     * Change Contacts List Filter
     * @param type
     */
    function filterChange(type) {
      vm.filterCategory = type;
      vm.listType = type;
      if (type === 'all') {
        vm.filterCategory = null;
        vm.showEditDeleteIcon = false;
      } else {
        vm.showEditDeleteIcon = true;
      }
    }

    /**
     * Reset Items Filter
     * @param type
     */
    function resetFilters() {
      vm.filterCategory = null;
    }

    /**
     * Toggle sidenav
     *
     * @param sidenavId
     */
    function toggleSidenav(sidenavId) {
      $mdSidenav(sidenavId).toggle();
    }

    function showCategoryName(isHide) {
      debugger
      return !isHide;
    }

    function addCategory(list) {
      var category = {
        "category": [{
          "language": "es",
          "description": "",
          "color": "#"
        }],
        "items": []
      };

      vm.inspection.check.unshift(category);
    }

    function addItem(list, type) {
      var newItem = {
        "name": {
          "es": {
            "description": "Nuevo item",
            "language": "es"
          }
        },
        "type": "SELECT",
        "isRequired": true,
        "values": []
      };

      switch (type) {
        case 1:
          newItem.type = "PASS/FAIL";
          newItem.values = [{
            "name": {
              "es": {
                "language": "es",
                "description": "PASS"
              }
            }
          }, {
            "name": {
              "es": {
                "language": "es",
                "description": "FAIL"
              }
            }
          }];
          break;
        case 2:
          newItem.type = "SELECT";
          newItem.values = _.map(vm.answerValues, function(item, index) {
            return {
              "name": {
                "es": {
                  "description": item.name,
                  "language": "es"
                }
              }
            };
          });
          break;
        case 3:
          newItem.type = "TEXT";
          break;
        default:
          newItem.type = "SELECT";
          break;
      }

      list.unshift(newItem);
    }

    function removeItem(list, item) {
      _.remove(list, function(i) {
        return i.code === item.code;
      })
    }

    function duplicateItem(list, item) {
      var copy = angular.copy(item);
      list.push(copy);
    }

    function changeAnswer(list, $index, value) {
      var isChecked = _.find(list, {
        "code": value.id
      });
      //_.find(list.values, ['code', value.id]);
      if (!isChecked) {
        list.push({
          "code": value.id,
          "name": {
            "es": {
              "description": value.name,
              "language": "es"
            }
          }
        });
      } else {
        _.remove(list, function(item) {
          return item.code === value.id;
        });
      }
    };

    function gotoInspection() {
      $state.go('app.administracion.inspecciones');
    }

    function toggleGroup(event) {
      var $el = $(event.currentTarget.nextElementSibling),
        $accordions = $(".form-accordion").not($el);

      $el.toggleClass("ng-hide");
      $.each($accordions, function(key, value) {
        $(value).addClass("ng-hide");
      });
    };

    function exists(item, list) {
      var isChecked = _.find(list.values, {
        'code': item.id
      });
      return isChecked ? true : false;
    };
  }

})();
