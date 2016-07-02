angular
    .module('app')
    .controller('CommentsController', ['$scope', '$rootScope', '$state', '$sce', 'MegalitosService', 'amMoment', '$stateParams', function($scope, $rootScope, $state, $sce,
        MegalitosService, amMoment, $stateParams) {
        MegalitosService.getComentariosMegalito($stateParams.megalitoId)
            .then(function(comentarios) {
                    $scope.comments = comentarios;

                },
                function(reason) {
                    //reason images
                    console.log(reason);

                });

        $scope.setAuthor = function(index, commentUserId) {
            MegalitosService.getUser(commentUserId)
                .then(function(user) {
                        $scope.comments[index].avatar = user.avatar;
                    },
                    function(reason) {
                        //reason images
                        console.log(reason);

                    });

            MegalitosService.getMegalito($stateParams.megalitoId)
                .then(function(megalito) {
                        if (commentUserId === megalito.userId)
                            $scope.comments[index].author = true;
                        else
                            $scope.comments[index].author = false;

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

        $scope.getGravatar = function(email) {
            /*var hash;
            if (email === void 0) {
                email = '';
            }
            hash = email.trim();
            hash = hash.toLowerCase();
            hash = md5(hash);
            return '//gravatar.com/avatar/' + hash + '?s=104&d=identicon';
            */
        };
        $scope.loveComment = function(commentId) {
            var comment, i, len, ref, results;
            ref = $scope.comments;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {

                comment = ref[i];
                if (comment.id === commentId) {
                    results.push(comment.loved = !comment.loved);
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
                                            console.log(comentario);
                                            console.log(user);
                                            MegalitosService.createComentarioResponse(user[0].id, comentario.id)
                                                .then(function() {
                                                        console.log("makina nauk");
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
                console.log(err);
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





            /* 
             */
        };

    }]);
