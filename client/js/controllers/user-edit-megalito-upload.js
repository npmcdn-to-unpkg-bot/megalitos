angular
    .module('app')
    .controller('UserEditMegalitoUploadController', ['$scope', '$rootScope', '$state', 'MegalitosService', '$http', '$q', 'FileUploader', '$stateParams',
        function($scope, $rootScope, $state, MegalitosService, $http, $q, FileUploader, $stateParams) {
            $(document).ready(function() {
                autosize($('.resizable_textarea'));
            });
            // initialize the validator function
            validator.message.date = 'not a real date';

            // validate a field on "blur" event, a 'select' on 'change' event & a '.reuired' classed multifield on 'keyup':
            $('form')
                .on('blur', 'input[required], input.optional, select[required], textarea[required]', validator.checkField)
                .on('change', 'select[required]', validator.checkField)
                .on('keypress', 'input[required][pattern]', validator.keypress);

            $('.multi.required').on('keyup blur', 'input', function() {
                validator.checkField.apply($(this).siblings().last()[0]);
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
                    console.log(item);
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

            uploader.onAfterAddingFile = function(item) {
                item.file.name = new Date().valueOf().toString() + "-" + item.file.name;
            };


            MegalitosService.getMegalito($stateParams.megalitoId)
                .then(function(megalito) {
                        $scope.megalito = megalito;
                        MegalitosService.getLugaresMegalito($stateParams.megalitoId)
                            .then(function(lugar) {
                                    $scope.megalito.selectedPaises = lugar[0].pais;
                                    console.log(lugar[0].pais);
                                    $scope.megalito.selectedComunidades = lugar[0].comunidad;
                                    console.log(lugar[0].comunidad);

                                    $scope.megalito.selectedProvincias = lugar[0].provincia;
                                    console.log(lugar[0].provincia);
                                    $scope.megalito.selectedPueblos = lugar[0].pueblo;
                                    $scope.megalito.lugarId = lugar[0].id;
                                    $http.get("/api/containers/paises/download/" + lugar[0].pais + ".json").success(function(data) {
                                        $scope.comunidades = data
                                        data.forEach(function(comunidades) {
                                            if (comunidades.comunidad === lugar[0].comunidad) {
                                                $scope.provincias = comunidades.provincias;
                                                $scope.provincias.forEach(function(provincias) {
                                                    if (provincias.provincia === lugar[0].provincia) {
                                                        $http.get("/api/containers/" + lugar[0].pais + "/download/" + provincias.codigo + ".json").success(function(data) {
                                                            $scope.pueblos = data;

                                                        });
                                                    }

                                                });


                                            }

                                        });


                                    });




                                },
                                function(reason) {
                                    //reason lugares
                                    console.log(reason);

                                });
                        MegalitosService.getCoordenadasMegalito($stateParams.megalitoId)
                            .then(function(coordenadas) {
                                    $scope.megalito.lat = coordenadas[0].lat;
                                    $scope.megalito.lng = coordenadas[0].lng;
                                    $scope.megalito.coordenadasId = coordenadas[0].id;
                                },
                                function(reason) {
                                    //reason coordenadas
                                    console.log(reason);

                                });
                        MegalitosService.getAllImagesMegalito($stateParams.megalitoId)
                            .then(function(images) {
                                    $scope.megalito.imagesId = images[0].id;
                                    for (var i = 0; i < images[0].imagenes.length; i++) {
                                        var dummy = new FileUploader.FileItem(uploader, {
                                            lastModifiedDate: images[0].imagenes[i].lastModifiedDate,
                                            size: images[0].imagenes[i].size,
                                            type: images[0].imagenes[i].type,
                                            name: images[0].imagenes[i].name
                                        });
                                        dummy.progress = 100;
                                        dummy.isUploaded = true;
                                        dummy.isSuccess = true;

                                        uploader.queue.push(dummy);
                                        $scope.oldImages = images[0].imagenes;


                                    }

                                },
                                function(reason) {
                                    //reason images
                                    console.log(reason);

                                });
                    },
                    function(reason) {
                        //reason megalito
                        console.log(reason);

                    });


            $scope.selectedPais = function(pais) {
                if (pais === undefined) {
                    angular.element(document.getElementById('comunidades'))[0].disabled = true;
                    angular.element(document.getElementById('provincias'))[0].disabled = true;
                    angular.element(document.getElementById('pueblos'))[0].disabled = true;
                    $scope.megalito.selectedComunidades = "-- SELECCIONE UNA COMUNIDAD--";
                    $scope.megalito.selectedProvincias = "-- SELECCIONE UNA PROVINCIA--";
                    $scope.megalito.selectedPueblos = "--SELECCIONE UN PUEBLO--";
                } else {
                angular.element(document.getElementById('comunidades'))[0].disabled = false;
                angular.element(document.getElementById('provincias'))[0].disabled = true;
                angular.element(document.getElementById('pueblos'))[0].disabled = true;
                $scope.megalito.selectedComunidades = "-- SELECCIONE UNA COMUNIDAD--";
                $scope.megalito.selectedProvincias = "-- SELECCIONE UNA PROVINCIA--";
                $scope.megalito.selectedPueblos = "--SELECCIONE UN PUEBLO--";
                $http.get("/api/containers/paises/download/" + pais + ".json").success(function(data) {
                    $scope.comunidades = data;

                });
            }

            };

            $scope.selectedComunidad = function() {
                angular.element(document.getElementById('provincias'))[0].disabled = false;
                angular.element(document.getElementById('pueblos'))[0].disabled = true;
                $scope.megalito.selectedPueblos = "--SELECCIONE UN PUEBLO--";
                ind = $scope.comunidades.indexOf($scope.megalito.selectedComunidades);
                if (ind !== -1) {
                    $scope.provincias = $scope.comunidades[ind].provincias;
                    $scope.megalito.selectedProvincias = "-- SELECCIONE UNA PROVINCIA--";
                } else {
                    angular.element(document.getElementById('provincias'))[0].disabled = true;
                    $scope.megalito.selectedProvincias = "-- SELECCIONE UNA PROVINCIA--";
                    angular.element(document.getElementById('pueblos'))[0].disabled = true;
                    $scope.megalito.selectedPueblos = "--SELECCIONE UN PUEBLO--";
                }


            };
            $scope.selectedProvincia = function(pais) {
                angular.element(document.getElementById('pueblos'))[0].disabled = false;
                ind = $scope.provincias.indexOf($scope.megalito.selectedProvincias);
                if (ind !== -1) {
                     $scope.megalito.selectedPueblos = "--SELECCIONE UN PUEBLO--";
                    $scope.codigo = $scope.provincias[ind].codigo;
                    url = "/api/containers/" + pais + "/download/" + $scope.codigo + ".json";
                    $http.get(url).success(function(data) {
                        $scope.pueblos = data;
                        // $scope.selectedComunidades = $scope.comunidades[0];

                    });
                } else {
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
                //editar megalito
                editMegalito();
            };
            $scope.removeOldImages = function(index, id) {
                console.log($scope.oldImages);
                for (var i = 0; i < $scope.oldImages.length; i++) {
                    var equal = false;
                    for (var j = 0; j < uploader.queue.length; j++) {
                        if ($scope.oldImages[i].name === uploader.queue[j].file.name)
                            equal = true;
                    }
                    if (equal === false) {
                        $http.delete('/api/containers/img/files/' + $scope.oldImages[i].name).success(function(data, status, headers) {
                            //$scope.files.splice(index, 1);
                        });
                    }

                }


            };

            function editMegalito() {
                MegalitosService.editMegalito($stateParams.megalitoId, $scope.megalito.nombre, $scope.megalito.tipoMegalito, $scope.megalito.estacionMegalitica, $scope.megalito.localizacion,
                    $scope.megalito.descripcion, $scope.megalito.descubrimiento, $scope.megalito.observaciones, $scope.megalito.bibliografia)

                .then(function(megalito) {
                        MegalitosService.editLugares($scope.megalito.lugarId, $scope.megalito.selectedPaises,$scope.megalito.selectedComunidades.comunidad,
                            $scope.megalito.selectedProvincias.provincia, $scope.megalito.selectedPueblos.pueblo)

                        .then(function(lugares) {
                                MegalitosService.editCoordenadas($scope.megalito.coordenadasId, $scope.megalito.lat, $scope.megalito.lng)
                                    .then(function(coordenadas) {
                                            MegalitosService.editImagenes($scope.megalito.imagesId, $scope.imagenes)

                                            .then(function(imagenes) {

                                                },
                                                function(reason) {
                                                    //reason imagenes
                                                    console.log(reason);
                                                    $state.go('megalitos');
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




        }

    ]);
