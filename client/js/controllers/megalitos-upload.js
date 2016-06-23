angular
    .module('app')
    .controller('MegalitosUploadController', ['$scope', 'MegalitosService', '$http', '$q', 'FileUploader',
        function($scope, MegalitosService, $http, $q, FileUploader) {
           
            // initialize the validator function
            validator.message.date = 'not a real date';

            // validate a field on "blur" event, a 'select' on 'change' event & a '.reuired' classed multifield on 'keyup':
            $('form')
                .on('blur', 'input[required], input.optional, select.required', validator.checkField)
                .on('change', 'select.required', validator.checkField)
                .on('keypress', 'input[required][pattern]', validator.keypress);

            $('.multi.required').on('keyup blur', 'input', function() {
                validator.checkField.apply($(this).siblings().last()[0]);
            });

            $('form').submit(function(e) {
                e.preventDefault();
                var submit = true;

                // evaluate the form using generic validaing
                if (!validator.checkAll($(this))) {
                    submit = false;
                }

                if (submit)
                    this.submit();

                return false;
            });




            // create a uploader with options
            $scope.imagenes = [];

            var uploader = $scope.uploader = new FileUploader({
                scope: $scope, // to automatically update the html. Default: $rootScope
                url: '/api/containers/img/upload',
                formData: [
                    { key: 'value' }
                ]
            });
            // ADDING FILTERS
            uploader.filters.push({
                name: 'imageFilter',
                fn: function(item, options) { // second user filter
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

            $http.get('/api/containers/comProv/download/comProv.json').success(function(data) {
                $scope.comunidades = data;

            });

            $scope.selectedComunidad = function() {
                angular.element(document.getElementById('provincias'))[0].disabled = false;
                angular.element(document.getElementById('pueblos'))[0].disabled = true;
                $scope.megalito.selectedPueblos = "--SELECCIONE UN PUEBLO--";
                ind = $scope.comunidades.indexOf($scope.megalito.selectedComunidades);
                if (ind !== -1) {
                    $scope.provincias = $scope.comunidades[ind].provincias;
                } else {
                    console.log("hemen1");
                    angular.element(document.getElementById('provincias'))[0].disabled = true;
                    $scope.megalito.selectedProvincias = "-- SELECCIONE UNA PROVINCIA--";
                    angular.element(document.getElementById('pueblos'))[0].disabled = true;
                    $scope.megalito.selectedPueblos = "--SELECCIONE UN PUEBLO--";
                }


            };
            $scope.selectedProvincia = function() {
                angular.element(document.getElementById('pueblos'))[0].disabled = false;
                ind = $scope.provincias.indexOf($scope.megalito.selectedProvincias);
                if (ind !== -1) {
                    $scope.codigo = $scope.provincias[ind].codigo;
                    url = "/api/containers/pueblos/download/" + $scope.codigo + ".json";
                    $http.get(url).success(function(data) {
                        $scope.pueblos = data;
                        // $scope.selectedComunidades = $scope.comunidades[0];

                    });
                } else {
                    console.log("hemen2");
                    angular.element(document.getElementById('pueblos'))[0].disabled = true;
                    $scope.megalito.selectedPueblos = "--SELECCIONE UN PUEBLO--";
                }
            };
            $scope.submitForm = function(e) {
                //No subir mas de 5 imagenes
                if (uploader.queue.length > 5) {
                    for (var i = uploader.queue.length - 1; i >= 5; i--) {

                        uploader.queue[i].remove();
                    }
                }
                //apilar las imagenes que se van a subir
                for (var i = 0; i < uploader.queue.length; i++) {
                    $scope.imagenes.push(uploader.queue[i].file);
                }
                uploader.uploadAll();
                //crear megalito
                uploader.onCompleteAll = function() {
                    console.log("hemen");
                    createMegalito();
                };

                function createMegalito() {
                    MegalitosService.createMegalito($scope.megalito.nombre, $scope.megalito.tipoMegalito, $scope.megalito.estacionMegalitica, $scope.megalito.localizacion,
                        $scope.megalito.descripcion, $scope.megalito.descubrimiento, $scope.megalito.observaciones, $scope.megalito.bibliografia)

                    .then(function(megalito) {
                            console.log(megalito);
                            MegalitosService.createLugares($scope.megalito.selectedComunidades.comunidad,
                                $scope.megalito.selectedProvincias.provincia, $scope.megalito.selectedPueblos.pueblo, megalito.id)

                            .then(function(lugares) {
                                    MegalitosService.createCoordenadas($scope.megalito.lat, $scope.megalito.lng, megalito.id)

                                    .then(function(coordenadas) {
                                            MegalitosService.createImagenes($scope.imagenes, megalito.id)

                                            .then(function(imagenes) {

                                                },
                                                function(reason) {
                                                    //reason imagenes
                                                    console.log(reason);
                                                    //borrar megalito lugares coordenadas e imagenes
                                                });


                                        },
                                        function(reason) {
                                            console.log(reason);
                                            //borrar megalito lugares y coordenadas
                                        });


                                },
                                function(reason) {
                                    //reason lugares
                                    console.log(reason);
                                    //borrar megalito y lugares
                                });




                        },
                        function(reason) {
                            //reson megalitos
                            console.log(reason);
                        });

                }



            };
        }

    ]);
