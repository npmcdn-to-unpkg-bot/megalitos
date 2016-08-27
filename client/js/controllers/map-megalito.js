angular
    .module('app')
    .controller('MapMegalitoController', ['$scope', 'MegalitosService', 'amMoment', '$stateParams', function($scope, MegalitosService,
        amMoment, $stateParams) {
        MegalitosService.getMegalito($stateParams.megalitoId)
            .then(function(megalitoMapa) {
                    $scope.megalitoMapa = megalitoMapa;
                    //coordenada del megalito
                    MegalitosService.getCoordenadasMegalito($stateParams.megalitoId)
                        .then(function(coordenada) {
                                
                                $scope.pasarCoordenadas(coordenada);

                            },
                            function(reason) {
                                //reason megalito
                                console.log(reason);

                            });
                },
                function(reason) {
                    //reason megalito
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
        var createMarker = function(i, coordenada, idKey) {
            if (idKey == null) {
                idKey = "id";
            }
            var latitude = coordenada.lat;
            var longitude = coordenada.lng;

            var ret = {
                latitude: latitude,
                longitude: longitude,
                icon: 'img/' + $scope.megalitoMapa.tipoMegalito + '.png',
                title: $scope.megalitoMapa.nombre,
                megalitoId: coordenada.megalitosId,
                options: { labelClass: 'marker_labels', labelAnchor: '22 45', labelContent: $scope.megalitoMapa.nombre }

            };
            ret[idKey] = i;
            return ret;
        };
        $scope.pasarCoordenadas = function(coordenada) {
             $scope.map.center =  {latitude: coordenada[0].lat,longitude:coordenada[0].lng};
                var markers = [];
                markers.push(createMarker(0, coordenada[0]));
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
