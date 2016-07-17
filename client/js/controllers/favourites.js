angular
    .module('app')
    .controller('FavouritesController', ['$scope','$rootScope' ,'AuthService', 'MegalitosService', '$state', '$http', 'FileUploader',
        function($scope,$rootScope, AuthService, MegalitosService, $state, $http, FileUploader) {
            var uploader = $scope.uploader = new FileUploader({
                scope: $scope, // to automatically update the html. Default: $rootScope
                url: '/api/containers/profile/upload',
                formData: [
                    { key: 'value' }
                ]
            });

            // ADDING FILTERS
            uploader.filters.push({
                name: 'filterName',
                fn: function(item, options) { // second user filter
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

            // CALLBACKS

            /**
             * Show preview with cropping
             */
            uploader.onAfterAddingFile = function(item) {
                item.file.name = new Date().valueOf().toString() + "-" + item.file.name;

                item.croppedImage = '';
                var reader = new FileReader();
                reader.onload = function(event) {
                    $scope.$apply(function() {
                        item.image = event.target.result;
                    });
                };
                reader.readAsDataURL(item._file);
            };
            //cargar imagenes
            $scope.chargeImages = function() {
                $http.get('/api/containers/profile/files').success(function(data) {
                    $scope.files = data;
                });

            };

            /**
             * Upload Blob (cropped image) instead of file.
             * @see
             *   https://developer.mozilla.org/en-US/docs/Web/API/FormData
             *   https://github.com/nervgh/angular-file-upload/issues/208
             */
            uploader.onBeforeUploadItem = function(item) {

                var blob = dataURItoBlob(item.croppedImage);
                item._file = blob;
            };

            /**
             * Converts data uri to Blob. Necessary for uploading.
             * @see
             *   http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
             * @param  {String} dataURI
             * @return {Blob}
             */
            var dataURItoBlob = function(dataURI) {
                var binary = atob(dataURI.split(',')[1]);
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                var array = [];
                for (var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                return new Blob([new Uint8Array(array)], { type: mimeString });
            };
            $scope.submitForm = function(e) {

                uploader.uploadAll();
                uploader.onCompleteAll = function() {
                    $scope.chargeImages();
                };
            };
            this.tab = 1;
            $scope.selectTab = function(setTab) {
                this.tab = setTab;
            };
            $scope.isSelected = function(checkTab) {
                return this.tab === checkTab;
            };

            $scope.restartPassword = function(e) {
                AuthService.hasPassword()
                    .then(function() {
                    });
            };

            $scope.setActive = function(index) {
                $scope.activeImage = index;
            };
            $scope.stablishImage = function() {
               var img="/api/containers/profile/download/"+$scope.files[$scope.activeImage].name;
                MegalitosService.updateUser($scope.currentUser.id,img)
                    .then(function() {
                        $rootScope.currentUser.avatar=img;
                            //$state.go($state.current, {}, { reload: true });
                            $state.go($state.current, {}, { reload: true });
                        },
                        function(reason) {
                            //reason images
                            console.log(reason);

                        });
            };

        }
    ]);