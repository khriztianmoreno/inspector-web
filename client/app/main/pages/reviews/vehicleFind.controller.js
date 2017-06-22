(function(){
  'use strict';

  angular
    .module('app.inspections')
    .controller('VehicleFindController', VehicleFindController);

  function VehicleFindController(VehicleService, ReviewService, CustomerService,
    $state, $rootScope, $mdDialog, Inspections, ImageService) {
    var vm = this;

    vm.selectedIndex = 0;
    vm.inspections= Inspections.data;
    vm.secondLocked = true;
    vm.inspectionTypeLocked = true;
    vm.thirdLocked = true;
    vm.noVehicle = false;
    vm.vehicle = null;
    vm.ngFlowOptions = {
        // You can configure the ngFlow from here
        /*target                   : 'api/media/image',
         chunkSize                : 15 * 1024 * 1024,
         maxChunkRetries          : 1,
         simultaneousUploads      : 1,
         testChunks               : false,
         progressCallbacksInterval: 1000*/
    };
    vm.ngFlow = {
        // ng-flow will be injected into here through its directive
        flow: {}
    };
    vm.dropping = false;
    vm.images = [{
        "default": true,
        "id": 1,
        "url": "assets/images/ecommerce/product-image-placeholder.png",
        "type": "image"
    }];


    vm.findVehicle = findVehicle;
    vm.updateVehicle = updateVehicle;
    vm.fileAdded = fileAdded;
    vm.upload = upload;
    vm.fileSuccess = fileSuccess;
    vm.selectInspectionType = selectInspectionType;
    vm.goToReview = goToReview;

    function findVehicle() {
      VehicleService
        .find(vm.searchVehicle)
        .then(function(resp){
          if (resp.length > 0) {
            vm.secondLocked = false;
            vm.selectedIndex = 1;
            vm.vehicle = resp[0];

            var beforeMileage = vm.vehicle.vehicleData.mileage;
            vm.beforeMileage = beforeMileage;

          }else{
            showMessageNotFound();
            vm.noVehicle = true;
            vm.searchVehicle = '';
          }
        });
    }

    function showMessageNotFound() {
        var alert = $mdDialog.alert()
            .title('Sin resultado')
            .htmlContent('El vehículo que estaba buscando no ha sido posible encontrarlo.')
            .ariaLabel('not found vehicle')
            .ok('OK');

        $mdDialog.show(alert);
    }

    function updateVehicle() {
      VehicleService.update(vm.vehicle).then(function(res){
        if (res._id) {
          vm.selectedIndex = 2;
          vm.inspectionTypeLocked = false;
          CustomerService.findById(vm.vehicle.customer.localId).then(function(res){
            if (res) {
              vm.vehicle.cost = res.payment.cost;
              ReviewService.setLocalVehicle(vm.vehicle);
            }
          });

        }
      });
    }

    /**
     * Dependiendo el tipo de revision, muestra el tab de imagen o pasa a la revision
     */
    function selectInspectionType() {
      if (vm.reviewType.type === 'PREVENTIVE') {
        vm.showImagesTab = true;
        vm.selectedIndex = 4;
        vm.thirdLocked = false;
      }else{
        $state.go('app.reviews.check', {id: vm.reviewType._id});
      }
    }

    /**
     * File added callback
     * Triggers when files added to the uploader
     *
     * @param file
     */
    function fileAdded(file) {
        // Prepare the temp file data for media list
        var uploadingFile = {
            id  : file.uniqueIdentifier,
            file: file,
            type: 'uploading'
        };

        // Append it to the media list
        vm.images.unshift(uploadingFile);
    }

    /**
     * Upload
     * Automatically triggers when files added to the uploader
     */
    function upload() {
        // Set headers
        vm.ngFlow.flow.opts.headers = {
            'X-Requested-With': 'XMLHttpRequest',
            //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
        };

        vm.ngFlow.flow.upload();
    }

    /**
     * File upload success callback
     * Triggers when single upload completed
     *
     * @param file
     * @param message
     */
    function fileSuccess(file, message) {
      // Iterate through the media list, find the one we
      // are added as a temp and replace its data
      // Normally you would parse the message and extract
      // the uploaded file data from it
      angular.forEach(vm.images, function (media, index) {
          if ( media.id === file.uniqueIdentifier ) {

              // Normally you would update the media item
              // from database but we are cheating here!
              var fileReader = new FileReader();
              fileReader.readAsDataURL(media.file.file);
              fileReader.onload = function (event)
              {
                  media.url = event.target.result;
              };

              // Update the image type so the overlay can go away
              media.type = 'image';
          }
      });

      console.log('ACA LO DEBO AGREGAR AL OBJETO');
    }

    function goToReview() {
      const imagePromises = [];
      if (vm.images.length === 3) {
        imagePromises.push(ImageService.uploadFromBase64(vm.images[0].url));
        imagePromises.push(ImageService.uploadFromBase64(vm.images[1].url));
        $state.go('app.reviews.check', { id: vm.reviewType._id, images: imagePromises });
      }
    }
  }

})();
