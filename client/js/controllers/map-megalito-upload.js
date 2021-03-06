angular
    .module('app')
    .controller('MapMegalitoUploadController', ['$scope', 'MegalitosService', 'amMoment', '$stateParams', function($scope, MegalitosService,
        amMoment, $stateParams) {
        $scope.map = {
            center: {
                latitude: 40.418889,
                longitude: -3.691944
            },
            zoom: 6,
            bounds: {}
        };
        $scope.options = {
            scrollwheel: false
        };

        var createMarker = function(i, coordenada, idKey) {
            if (idKey == null) {
                idKey = "id";
            }
            console.log(coordenada);
            var latitude = coordenada.lat;
            var longitude = coordenada.lng;

            var ret = {
                latitude: latitude,
                longitude: longitude,
                icon: 'img/' + coordenada.tipoMegalito + '.png',
                // title: $scope.megalitoMapa.nombre,
                //images: $scope.images.imagenes[0].name,
                megalitoId: coordenada.megalitosId,
                options: { labelClass: 'marker_labels', labelAnchor: '22 45' }

            };
            ret[idKey] = i;
            return ret;
        };
        
        $scope.pasarCoordenadas = function(tipoMegalito, lat, lng) {
            $scope.coordenadasMapa = [];
            if (lat && lng && tipoMegalito) {
                console.log("egiten");
                console.log(tipoMegalito);
                $scope.megalitosMarkers = [];
                $scope.map.center =  {latitude: lat,longitude:lng};
                $scope.coordenadasMapa.push({
                    tipoMegalito: tipoMegalito,
                    lat: lat,
                    lng: lng,
                    id: "1"
                });
                var markers = [];
                markers.push(createMarker(0, $scope.coordenadasMapa[0]));
                $scope.megalitosMarkers = markers;

            }

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
