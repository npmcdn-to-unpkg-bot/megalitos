angular
    .module('app')
    .controller('UserCommentsController', ['$scope', '$rootScope', '$state', '$sce', 'MegalitosService', 'amMoment', '$stateParams', '$filter', function($scope, $rootScope, $state, $sce,
        MegalitosService, amMoment, $stateParams, $filter) {
        MegalitosService.getAllUserComents($scope.currentUser.id)
            .then(function(userComents) {
                    $scope.comments = userComents;

                    userComents.forEach(function(comentario, index) {
                        //corazones
                        MegalitosService.getCommentFavourite(comentario.id, $rootScope.currentUser.id)
                            .then(function(commentarioFavourite) {

                                try {
                                    if (commentarioFavourite[0].favourite) {
                                        userComents[index].loved = true;
                                    }

                                } catch (err) {

                                }


                            }, function(reason) {

                                //reason images
                                console.log(reason);

                            });

                    });
                    //ver respuestas para este usuario
                    MegalitosService.getAllUserResponses($scope.currentUser.id)
                        .then(function(responses) {
                            responses.forEach(function(response, index) {
                                    MegalitosService.getComment(response.comentariosId)
                                        .then(function(comment) {
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
                                                        return a.indexOf(item) == pos;
                                                    });

                                                    for (var j = 0; j < $scope.comments.length; j++) {
                                                        for (var z = 0; z < uniqueArray.length; z++) {
                                                            if ($scope.comments[j].megalitosId === uniqueArray[z])
                                                            $scope.comments[j].ordenar = z;

                                                        }
                                                    }
                                                    $scope.ufa=$scope.comments;

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



            MegalitosService.createComentarioMegalito($stateParams.megalitoId, $rootScope.currentUser.id, $rootScope.currentUser.username, $scope.newComment.content)
                .then(function(comentarios) {
                        $state.go($state.current, {}, { reload: true });
                    },
                    function(reason) {
                        //reason images
                        console.log(reason);

                    });
        };
        $scope.min = function(arr) {
            console.log("nazka");
            return $filter('min')
                ($filter('map')(arr, 'createdAt'));
        };



    }]);
