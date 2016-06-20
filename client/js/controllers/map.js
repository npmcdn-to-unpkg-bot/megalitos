angular
    .module('app')
    .controller('MapController', ['$scope', 'MegalitosService', 'amMoment', '$stateParams', 'Lightbox', function($scope, MegalitosService,
        amMoment, $stateParams, Lightbox) {

        MegalitosService.getAllCoordenadas()
            .then(function(coordenadas) {
                    $scope.coordenadas = coordenadas;
                    $scope.megalito = [];
                    $scope.images = [];
                    $scope.coordenadas.forEach(function(coordenada) {
                        MegalitosService.getMegalito(coordenada.megalitosId)
                            .then(function(megalito) {
                                    $scope.megalito.push(megalito);
                                },
                                function(reason) {
                                    //reason megalito
                                    console.log(reason);

                                });

                        MegalitosService.getImagesMegalito(coordenada.megalitosId)
                            .then(function(images) {
                                    $scope.images.push(images[0]);
                                },
                                function(reason) {
                                    //reason images
                                    console.log(reason);

                                });

                    });
                    $scope.drawMap();

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
            console.log($scope.images[i].imagenes[0].name);
            var ret = {
                latitude: latitude,
                longitude: longitude,
                icon: 'img/' + $scope.megalito[i].tipoMegalito + '.png',
                title: $scope.megalito[i].nombre,
                images: $scope.images[i].imagenes[0].name,
                megalitoId: coordenada.megalitosId,
                options: { labelClass: 'marker_labels', labelAnchor: '22 45', labelContent: $scope.megalito[i].nombre }

            };
            ret[idKey] = i;
            return ret;
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

                    for (var i = 0; i < $scope.coordenadas.length; i++) {
                        markers.push(createMarker(i, $scope.coordenadas[i]));
                    }
                    $scope.megalitosMarkers = markers;
                }
            }, true);


        };



    }]);
