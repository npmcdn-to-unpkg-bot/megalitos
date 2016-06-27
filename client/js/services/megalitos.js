angular
    .module('app')
    .factory('MegalitosService', ['$rootScope', 'Megalitos', 'Lugares', 'Coordenadas', 'Imagenes','Comentarios', function(
        $rootScope, Megalitos, Lugares, Coordenadas, Imagenes,Comentarios) {
        function getAllMegalitos() {
            return Megalitos
                .find()

            .$promise;
        }
        function getAllCoordenadas() {
            return Coordenadas
                .find()

            .$promise;
        }
        function getAllLugares() {
            return Lugares
                .find()

            .$promise;
        }

        function getMegalito(megalitoId) {
            return Megalitos.findById({ id: megalitoId })
            .$promise;
        }
        function getLugaresMegalito(megalitoId) {
            return  Lugares.find({
                    filter: {
                        where: {
                            megalitosId: megalitoId
                        }
                    }
                }).$promise;
        }
        function getLugaresComunidad(comunidad) {
            return  Lugares.find({
                    filter: {
                        where: {
                            comunidad: comunidad
                        }
                    }
                }).$promise;
        }
        function getCoordenadasMegalito(megalitoId) {
            return  Coordenadas.find({
                    filter: {
                        where: {
                            megalitosId: megalitoId
                        }
                    }
                }).$promise;
        }

        function getImagesMegalito(megalitoId) {
            return  Imagenes.find({
                    filter: {
                        where: {
                            megalitosId: megalitoId
                        }
                    }
                }).$promise;
        }
        function createMegalito(nombre, tipoMegalito, estacionMegalitica, localizacion, descripcion, descubrimiento, observaciones, bibliografia) {
            return Megalitos
                .create({
                    nombre: nombre,
                    tipoMegalito: tipoMegalito,
                    estacionMegalitica: estacionMegalitica,
                    localizacion: localizacion,
                    descripcion: descripcion,
                    descubrimiento: descubrimiento,
                    observaciones: observaciones,
                    bibliografia: bibliografia

                })

            .$promise;

        }

        function createLugares(comunidad, provincia,
            pueblo, megalitoId) {
            return Megalitos.lugares
                .create({ id: megalitoId }, {
                    comunidad: comunidad,
                    provincia: provincia,
                    pueblo: pueblo

                })
                .$promise;
        }


        function createCoordenadas(lat, lng, megalitoId) {
            return Megalitos.coordenadas
                .create({ id: megalitoId }, {
                    lat: lat,
                    lng: lng
                })
                .$promise;

        }

        function createImagenes(imagenes, megalitoId) {
            return Megalitos.imagenes
                .create({ id: megalitoId }, {
                    imagenes: imagenes
                })
                .$promise;

        }

        function deleteLugares(lugaresId) {
            return Megalitos.lugares
                .deleteById({ id: lugaresId })
                .$promise;

        }

        function deleteCoordenadas(coordenadasId) {
            return Megalitos.coordenadas
                .deleteById({ id: coordenadasId })
                .$promise;


        }

        function deleteImagenes(imagesId) {
            return Megalitos.imagenes
                .deleteById({ id: imagesId })
                .$promise;

        }
         function createComentarioMegalito(megalitoId,userId,comentario) {
            console.log(megalitoId);
            console.log(userId);
            console.log(comentario);
            return  Comentarios.create({
                    megalitosId:megalitoId,
                    userId:userId,
                    comentario:comentario
                }).$promise;

        }
        function getComentariosMegalito(megalitoId) {
            return  Comentarios.find({
                    filter: {
                        where: {
                            megalitosId: megalitoId
                        }
                    }
                }).$promise;
        }


        return {
            getAllMegalitos:getAllMegalitos,
            getAllCoordenadas:getAllCoordenadas,
            getAllLugares:getAllLugares,
            getMegalito:getMegalito,
            getLugaresMegalito:getLugaresMegalito,
            getLugaresComunidad:getLugaresComunidad,
            getCoordenadasMegalito:getCoordenadasMegalito,
            getImagesMegalito:getImagesMegalito,
            createMegalito: createMegalito,
            createLugares: createLugares,
            createCoordenadas: createCoordenadas,
            createImagenes: createImagenes,
            deleteLugares: deleteLugares,
            deleteCoordenadas: deleteCoordenadas,
            deleteImagenes: deleteImagenes,
            createComentarioMegalito:createComentarioMegalito,
            getComentariosMegalito:getComentariosMegalito
        };
    }]);
