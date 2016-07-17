angular
    .module('app')
    .controller('CommentsController', ['$scope', '$rootScope', '$state', '$sce', 'MegalitosService', 'amMoment', '$stateParams', function($scope, $rootScope, $state, $sce,
        MegalitosService, amMoment, $stateParams) {
        MegalitosService.getAllComentariosMegalito($stateParams.megalitoId)
            .then(function(comentarios) {
                    $scope.comments = comentarios;
                    comentarios.forEach(function(comentario, index) {
                        MegalitosService.getCommentFavourite(comentario.id, $rootScope.currentUser.id)
                            .then(function(commentarioFavourite) {
                                
                                try {
                                    if (commentarioFavourite[0].favourite) {
                                    comentarios[index].loved = true;
                                }


                                } catch (err) {
                                    console.log("barruan");
                                    
                                }


                            }, function(reason) {

                                //reason images
                                console.log(reason);

                            });

                    });

                },
                function(reason) {
                    //reason images
                    console.log(reason);

                });




        $scope.setAuthor = function(comment) {
            MegalitosService.getUser(comment.userId)
                .then(function(user) {
                        comment.avatar = user.avatar;
                    },
                    function(reason) {
                        //reason images
                        console.log(reason);

                    });

            MegalitosService.getMegalito($stateParams.megalitoId)
                .then(function(megalito) {
                        if (comment.userId === megalito.userId)
                            comment.author = true;
                        else
                            comment.author = false;

                    },
                    function(reason) {
                        //reason images
                        console.log(reason);

                    });

        };


        $scope.newComment = {};
        markdown = function(string) {
            string = string.replace(/(@.+)@/g, '<span class="reply">$1</span>');
            string = string.replace(/\*\*(.+)\*\*/g, '<strong>$1</strong>');
            string = string.replace(/__(.+)__/g, '<strong>$1</strong>');
            string = string.replace(/\*(.+)\*/g, '<em>$1</em>');
            string = string.replace(/_(.+)_/g, '<em>$1</em>');
            string = string.replace(/``(.+)``/g, '<code>$1</code>');
            string = string.replace(/`(.+)`/g, '<code>$1</code>');
            return string;
        };
        $scope.parseContent = function(content) {
            return $sce.trustAsHtml(content);
        };
        $scope.loveComment = function(commentId) {
            var comment, i, len, ref, favourite, id, results;
            ref = $scope.comments;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {

                comment = ref[i];
                if (comment.id === commentId) {
                    results.push(comment.loved = !comment.loved);
                    if (comment.loved)
                        favourite = true;
                    else
                        favourite = false;
                    MegalitosService.getCommentFavourite(commentId, $rootScope.currentUser.id)
                        .then(function(commentarioFavourite) {
                            console.log(results);
                            if (commentarioFavourite.length === 0) {
                                id = commentarioFavourite;
                            } else {
                                id = commentarioFavourite[0].id;
                            }
                            MegalitosService.upsertCommentFavourite(id, commentId, favourite, $rootScope.currentUser.id)
                                .then(function(comentarios) {}, function(reason) {
                                    //reason images
                                    console.log(reason);

                                });
                        }, function(reason) {

                            //reason images
                            console.log(reason);

                        });


                } else {
                    results.push(void 0);
                }
            }

            return results;
        };
        $scope.addReply = function(author) {
            if ($scope.newComment.content === void 0) {
                $scope.newComment.content = '';
            }
            if ($scope.newComment.content.search('@' + author + '@') === -1) {
                if ($scope.newComment.content[0] === '@') {
                    $scope.newComment.content = ', ' + $scope.newComment.content;
                } else {
                    $scope.newComment.content = ' ' + $scope.newComment.content;
                }
                $scope.comentAutor = author;
                return $scope.newComment.content = '@' + author + '@' + $scope.newComment.content;


            }
        };
        $scope.createNewComment = function() {
            createComentarioWithResponse = function(usuariosMencionados) {
                MegalitosService.createComentarioMegalito($stateParams.megalitoId, $rootScope.currentUser.id, $rootScope.currentUser.username, $scope.newComment.content)
                    .then(function(comentario) {
                            usuariosMencionados.forEach(function(usuarioMencionado) {
                                MegalitosService.getUserWithUsername(usuarioMencionado)
                                    .then(function(user) {
                                            if (user[0]) {
                                                MegalitosService.createComentarioResponse(user[0].id, comentario.id)
                                                    .then(function() {
                                                            console.log("makina nauk");
                                                        },
                                                        function(reason) {
                                                            //reason images
                                                            console.log(reason);

                                                        });
                                            }

                                        },
                                        function(reason) {
                                            //reason images
                                            console.log(reason);

                                        });


                            });

                            $state.go($state.current, {}, { reload: true });
                        },
                        function(reason) {
                            //reason images
                            console.log(reason);

                        });


                $state.go($state.current, {}, { reload: true });


            };
            var elem;
            try {

                usuariosMencionados = $scope.newComment.content.match(/@(.*)@/).pop().replace(/@/g, '').replace(/ /g, '').split(',');
                $scope.newComment.content = markdown($scope.newComment.content);
                createComentarioWithResponse(usuariosMencionados);

            } catch (err) {
                console.log("barruan");
                $scope.newComment.content = markdown($scope.newComment.content);
                //comment, no response
                MegalitosService.createComentarioMegalito($stateParams.megalitoId, $rootScope.currentUser.id, $rootScope.currentUser.username, $scope.newComment.content)
                    .then(function(comentario) {
                            $state.go($state.current, {}, { reload: true });
                        },
                        function(reason) {
                            //reason images
                            console.log(reason);

                        });
            }

        };

    }]);
