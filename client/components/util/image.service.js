(function () {
  angular
    .module('inspector')
    .service('ImageService', ['$http', 'ApiEndpoint', '$q', ImageService]);

  function ImageService($http, ApiEndPoint, $q) {
    this.uploadFromBase64 = function (base64WebImage) {
      return $http.post(
        ApiEndPoint.image.upload,
        { image: base64WebImage }
      )
        .then(function (res) {
          return res.data;
        });
    }

    this.uploadFromBase64WithRef = function (base64WebImage, ref) {
      var defer = $q.defer();
      this.uploadFromBase64(base64WebImage)
        .then(function (res) {
          ref.photos.uploadedUrl = res.image_url;
          defer.resolve(res.image_url);
        })
        .catch(function (err) {
          defer.reject(err);
        });

      return defer.promise;
    }
  }

})();
