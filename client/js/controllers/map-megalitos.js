angular
    .module('app')
    .controller('MapMegalitosController', ['$scope', 'MegalitosService', 'amMoment', '$stateParams', function($scope, MegalitosService,
        amMoment, $stateParams) {
        var getImagesMegalito = function(megalitosId,megalitoMapa) {
            MegalitosService.getAllImagesMegalito(megalitosId)
                .then(function(images) {
                        $scope.images.push(images[0]);
                        $scope.pasarCoordenadas(megalitoMapa);
                    },
                    function(reason) {
                        //reason images
                        console.log(reason);

                    });

        };

        MegalitosService.getAllCoordenadas()
            .then(function(coordenadasMapa) {
                    $scope.coordenadasMapa = coordenadasMapa;
                    $scope.megalitoMapa = [];
                    $scope.images = [];
                    $scope.coordenadasMapa.forEach(function(coordenada, index) {
                        if ($stateParams.clase === "Todos") {
                            MegalitosService.getMegalito(coordenada.megalitosId)
                                .then(function(megalitoMapa) {
                                        $scope.megalitoMapa.push(megalitoMapa);
                                        getImagesMegalito(coordenada.megalitosId,megalitoMapa);
                                    },
                                    function(reason) {
                                        //reason megalito
                                        console.log(reason);

                                    });

                        } else {
                            MegalitosService.getMegalitoMapa(coordenada.megalitosId, $stateParams.clase)
                                .then(function(megalitoMapa) {
                                        if (megalitoMapa.length !== 0) {
                                            $scope.megalitoMapa.push(megalitoMapa[0]);
                                            getImagesMegalito(coordenada.megalitosId,megalitoMapa[0]);
                                        }
                                    },
                                    function(reason) {
                                        //reason megalito
                                        console.log(reason);

                                    });

                        }

                    });


                },
                function(reason) {
                    //reason megalitos
                    console.log(reason);

                });


        $scope.map = {
            center: {
                latitude: 40.418889,
                longitude: -3.691944
            },
            zoom: 6,
            markersEvents: {
                click: function(marker, eventName, model) {
                    $scope.map.window.model = model;
                    $scope.map.window.show = true;
                }
            },
            window: {
                marker: {},
                show: false,
                closeClick: function() {
                    this.show = false;
                },
                options: {}
            },
            bounds: {}
        };
        $scope.options = {
            scrollwheel: false
        };
        $scope.onMarkerClicked = function() {

        };
        var createMarker = function(i, coordenada, idKey) {
            if (idKey == null) {
                idKey = "id";
            }
            var latitude = coordenada.lat;
            var longitude = coordenada.lng;
            var ret = {
                latitude: latitude,
                longitude: longitude,
                icon: 'img/' + $scope.megalitoMapa[i].tipoMegalito + '.png',
                title: $scope.megalitoMapa[i].nombre,
                images: $scope.images[i].imagenes[0].name,
                megalitoId: coordenada.megalitosId,
                options: { labelClass: 'marker_labels', labelAnchor: '22 45', labelContent: $scope.megalitoMapa[i].nombre }

            };
            ret[idKey] = i;
            return ret;
        };
        $scope.pasarCoordenadas = function(coordenadas) {
            var markers = [];
            for (var i = 0; i < $scope.megalitoMapa.length; i++) {
                markers.push(createMarker(i, $scope.coordenadasMapa[i]));
            }
            $scope.megalitosMarkers = markers;

        };


        $scope.drawMap = function() {

            $scope.megalitosMarkers = [];
            // Get the bounds from the map once it's loaded
            $scope.$watch(function() {
                return $scope.map.bounds;
            }, function(nv, ov) {
                // Only need to regenerate once
                if (!ov.southwest && nv.southwest) {
                    var markers = [];
                    $scope.megalitosMarkers = markers;
                }
            }, true);


        };
        $scope.drawMap();



    }]);
