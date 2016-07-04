angular
    .module('app')
    .factory('MegalitosService', ['$rootScope', 'User', 'Megalitos', 'Lugares', 'Coordenadas', 'Imagenes', 'Comentarios', 'MencionadoComentario', function(
        $rootScope, User, Megalitos, Lugares, Coordenadas, Imagenes, Comentarios, MencionadoComentario) {
        function getAllMegalitos() {
            return Megalitos
                .find()
                .$promise;
        }

        function getMegalito(megalitoId) {
            return Megalitos.findById({ id: megalitoId })
                .$promise;
        }

        function createMegalito(userId, nombre, tipoMegalito, estacionMegalitica, localizacion, descripcion, descubrimiento, observaciones, bibliografia) {
            return Megalitos
                .create({
                    userId: userId,
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

        function getAllCoordenadas() {
            return Coordenadas
                .find()

            .$promise;
        }

        function getCoordenadasMegalito(megalitoId) {
            return Coordenadas.find({
                filter: {
                    where: {
                        megalitosId: megalitoId
                    }
                }
            }).$promise;
        }

        function getAllLugares() {
            return Lugares
                .find()
                .$promise;
        }

        function getLugaresMegalito(megalitoId) {
            return Lugares.find({
                filter: {
                    where: {
                        megalitosId: megalitoId
                    }
                }
            }).$promise;
        }

        function getAllLugaresComunidad(comunidad) {
            return Lugares.find({
                filter: {
                    where: {
                        comunidad: comunidad
                    }
                }
            }).$promise;
        }



        function getAllImagesMegalito(megalitoId) {
            return Imagenes.find({
                filter: {
                    where: {
                        megalitosId: megalitoId
                    }
                }
            }).$promise;
        }



        function createComentarioMegalito(megalitoId, userId, username, message) {
            return Comentarios.create({
                megalitosId: megalitoId,
                userId: userId,
                username: username,
                message: message
            }).$promise;

        }

        function getAllComentariosMegalito(megalitoId) {
            return Comentarios.find({
                filter: {
                    where: {
                        megalitosId: megalitoId
                    }
                }
            }).$promise;
        }

        function getAllUserComents(userId) {
            return Comentarios.find({
                    filter: {
                        where: {
                            userId: userId
                        }
                    }
                })
                .$promise;
        }

        function getComment(commentId) {
            return Comentarios.findById({ id: commentId })
                .$promise;
        }

        function getUser(userId) {
            return User.findById({ id: userId })
                .$promise;
        }

        function getUserWithUsername(username) {
            return User.find({
                    filter: {
                        where: {
                            username: username
                        }
                    }
                })
                .$promise;

        }

        function updateUser(userId, avatar) {
            return User
                .prototype$updateAttributes({ id: userId }, { avatar: avatar }).$promise;

        }


        function createComentarioResponse(usuarioMencionado, comentarioId) {
            return MencionadoComentario
                .create({
                    comentariosId: comentarioId,
                    usuarioMencionado: usuarioMencionado
                }).$promise;

        }

        function getUserAllResponses(userId) {
            return MencionadoComentario.find({
                    filter: {
                        where: {
                            and: [{ usuarioMencionado: userId },
                                { leido: 'false' }
                            ]
                        }
                    }
                })
                .$promise;

        }
        function updateUserResponse(mencionadoComentarioId) {
            return MencionadoComentario
                .prototype$updateAttributes({ id: mencionadoComentarioId }, { leido: 'true' }).$promise;

        }



        return {
            getAllMegalitos: getAllMegalitos,
            getAllCoordenadas: getAllCoordenadas,
            getAllLugares: getAllLugares,
            getMegalito: getMegalito,
            getLugaresMegalito: getLugaresMegalito,
            getLugaresComunidad: getAllLugaresComunidad,
            getCoordenadasMegalito: getCoordenadasMegalito,
            getAllImagesMegalito: getAllImagesMegalito,
            createMegalito: createMegalito,
            createLugares: createLugares,
            createCoordenadas: createCoordenadas,
            createImagenes: createImagenes,
            deleteLugares: deleteLugares,
            deleteCoordenadas: deleteCoordenadas,
            deleteImagenes: deleteImagenes,
            createComentarioMegalito: createComentarioMegalito,
            getAllComentariosMegalito: getAllComentariosMegalito,
            getUser: getUser,
            getUserWithUsername: getUserWithUsername,
            getAllUserComents: getAllUserComents,
            getComment:getComment,
            createComentarioResponse: createComentarioResponse,
            updateUser: updateUser,
            getUserAllResponses: getUserAllResponses,
            updateUserResponse:updateUserResponse
        };
    }]);
