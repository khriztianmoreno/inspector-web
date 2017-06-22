(function() {
  'use strict';

  angular
    .module('app.inspections')
    .controller('InspectionsTaskDialogController', TaskDialogController);

  /** @ngInject */
  function TaskDialogController($mdDialog, $scope, $timeout, $rootScope, Task, Tasks, event, ImageService) {
    var vm = this;

    vm.ngFlowOptions = {};
    vm.ngFlow = {
        // ng-flow will be injected into here through its directive
        flow: {}
    };

    // Data
    vm.title = Task.tags[0].name;
    vm.task = Task;
    vm.tasks = Tasks;
    vm.newTask = false;
    vm.files = [];
    vm.errFiles = [];
    vm.upload = upload;
    vm.fileAdded = fileAdded;
    vm.fileSuccess = fileSuccess;
    vm.deleteImage = deleteImage;
    // vm.uploadComplete = uploadComplete;

    function fileAdded(file) {
        // Prepare the temp file data for media list
        var uploadingFile = {
            id  : file.uniqueIdentifier,
            file: file,
            type: 'uploading'
        };

        // Append it to the media list
        vm.task.photos = uploadingFile;
    }

    function deleteImage() {
      vm.task.photos.url = null;
    }

    function fileSuccess(file, message) {
      // Iterate through the media list, find the one we
      // are added as a temp and replace its data
      // Normally you would parse the message and extract
      // the uploaded file data from it
      var fileReader = new FileReader();
      fileReader.readAsDataURL(vm.task.photos.file.file);
      fileReader.onload = function (event) {
          vm.task.photos.url = event.target.result;
      };

      // Update the image type so the overlay can go away
      vm.task.photos.type = 'image';
      console.log('ACA LO DEBO AGREGAR AL OBJETO');
    }

    function upload() {
      // Set headers
      vm.ngFlow.flow.opts.headers = {
          'X-Requested-With': 'XMLHttpRequest',
          //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
      };

      vm.ngFlow.flow.upload();
    }

    if (!vm.task) {
      vm.task = {
        'id': '',
        'title': '',
        'notes': '',
        'startDate': new Date(),
        'startDateTimeStamp': new Date().getTime(),
        'dueDate': '',
        'dueDateTimeStamp': '',
        'completed': false,
        'starred': false,
        'important': false,
        'deleted': false,
        'tags': []
      };
      vm.title = 'New Task';
      vm.newTask = true;
      vm.task.tags = [];
    }

    // Methods
    vm.saveTask = saveTask;
    vm.deleteTask = deleteTask;
    vm.closeDialog = closeDialog;

    //////////


    /**
     * Save task
     */
    function saveTask() {
      // Dummy save action
      var image = vm.task.photos.url;
      if (image) {
        vm.task.photos.promise = ImageService.uploadFromBase64WithRef(image, vm.task);
      }
      closeDialog();
    }

    /**
     * Delete task
     */
    function deleteTask() {
      var confirm = $mdDialog.confirm()
        .title('Are you sure?')
        .content('The Task will be deleted.')
        .ariaLabel('Delete Task')
        .ok('Delete')
        .cancel('Cancel')
        .targetEvent(event);

      $mdDialog.show(confirm).then(function() {
        // Dummy delete action
        for (var i = 0; i < vm.tasks.length; i++) {
          if (vm.tasks[i].id === vm.task.id) {
            vm.tasks[i].deleted = true;
            break;
          }
        }
      }, function() {
        // Cancel Action
      });
    }

    /**
     * Close dialog
     */
    function closeDialog() {
      console.log(vm.task);
      $mdDialog.hide();
    }
  }
})();
