angular
    .module('app')
    .controller('UserCommentsController', ['$scope', '$rootScope', '$state', '$sce', 'MegalitosService', 'amMoment', '$stateParams', '$filter', function($scope, $rootScope, $state, $sce,
        MegalitosService, amMoment, $stateParams, $filter) {
        var userLocal = window.localStorage.getItem("$LoopBack$currentUserId");
        MegalitosService.getAllUserComents(userLocal)
            .then(function(userComents) {
                    $scope.comments = userComents;
                    $scope.userComents = $scope.comments;
                    $scope.corazones($scope.userComents);
                    //console.log($scope.comments);
                    //ver respuestas para este usuario
                    MegalitosService.getAllUserResponses(userLocal)
                        .then(function(responses) {
                            console.log(responses);
                            responses.forEach(function(response, index) {
                                    MegalitosService.getComment(response.comentariosId)
                                        .then(function(comment) {
                                                if (comment.userId !== userLocal)
                                                    $scope.comments.push(comment);
                                                if (index === responses.length - 1) {
                                                    //ordenar array
                                                    $scope.comments.sort(function(x, y) {
                                                        return new Date(y.createdAt) - new Date(x.createdAt);

                                                    });
                                                    var a = [];
                                                    for (var i = 0; i < $scope.comments.length; i++) {
                                                        a.push($scope.comments[i].megalitosId);
                                                    }

                                                    uniqueArray = a.filter(function(item, pos) {
                                                        return a.indexOf(item) === pos;
                                                    });
                                                    //titulo para el grupo
                                                    $scope.megalito = [];
                                                    $scope.comments.forEach(function(comment, index) {
                                                        MegalitosService.getMegalito(comment.megalitosId)
                                                            .then(function(megalito) {
                                                                $scope.comments[index].megalitoNombre = megalito.nombre;


                                                            }, function(reason) {

                                                                //reason images
                                                                console.log(reason);

                                                            });

                                                    });
                                                    for (var j = 0; j < $scope.comments.length; j++) {
                                                        for (var z = 0; z < uniqueArray.length; z++) {
                                                            if ($scope.comments[j].megalitosId === uniqueArray[z])
                                                                $scope.comments[j].ordenar = z;

                                                        }
                                                    }
                                                    $scope.userComents = $scope.comments;
                                                    //corazones
                                                    $scope.corazones($scope.userComents);


                                                }


                                            },
                                            function(reason) {
                                                //reason images
                                                console.log(reason);

                                            });

                                },
                                function(reason) {
                                    //reason images
                                    console.log(reason);

                                });




                        });
                    //$scope.comments.forEach

                },
                function(reason) {
                    //reason images
                    console.log(reason);

                });
        $scope.corazones = function(userComents) {
            $scope.userComents.forEach(function(comentario, index) {
                MegalitosService.getCommentFavourite(comentario.id, userLocal)
                    .then(function(commentarioFavourite) {
                        try {
                            if (commentarioFavourite[0].favourite) {
                                $scope.userComents[index].loved = true;
                            }

                        } catch (err) {

                        }


                    }, function(reason) {

                        //reason images
                        console.log(reason);

                    });

            });

        };

        $scope.setAuthor = function(comment) {
            MegalitosService.getUser(comment.userId)
                .then(function(user) {
                        comment.avatar = user.avatar;
                    },
                    function(reason) {
                        //reason images
                        console.log(reason);

                    });
            MegalitosService.getMegalito(comment.megalitosId)
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
                    if (comment.loved) {
                        favourite = true;

                    } else {
                        favourite = false;
                    }
                    MegalitosService.getCommentFavourite(commentId, userLocal)
                        .then(function(commentarioFavourite) {
                            if (commentarioFavourite.length === 0) {
                                id = commentarioFavourite;
                                //añadir favourite
                                MegalitosService.upsertCommentFavourite(id, commentId, favourite, userLocal)
                                    .then(function(comentarios) {}, function(reason) {
                                        //reason images
                                        console.log(reason);

                                    });

                            } else {
                                id = commentarioFavourite[0].id;
                                //eliminar favourite
                                MegalitosService.deleteCommentFavourite(id)
                                    .then(function(comentarios) {}, function(reason) {
                                        //reason images
                                        console.log(reason);

                                    });
                            }

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
                return $scope.newComment.content = '@' + author + '@' + $scope.newComment.content;

            }
        };
        $scope.createNewComment = function() {
            /* $scope.newComment.id = $scope.comments.length + 1;
             //$scope.newComment.author.website = $scope.newComment.author.website.replace(/https?:\/\/(www.)?/g, '');
             $scope.comment.message = markdown($scope.comment.message);
             $scope.newComment.loved = false;
             */
            $scope.newComment.content = markdown($scope.newComment.content);



            MegalitosService.createComentarioMegalito($stateParams.megalitoId, userLocal, $rootScope.currentUser.username, $scope.newComment.content)
                .then(function(comentarios) {
                        $state.go($state.current, {}, { reload: true });
                    },
                    function(reason) {
                        //reason images
                        console.log(reason);

                    });
        };



    }]);
