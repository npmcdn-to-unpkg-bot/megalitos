angular
    .module('app', ['ui.router', 'lbServices', 'ngCookies', 'angularFileUpload', 'angularMoment', 'angular.filter', 'bootstrapLightbox', 'oc.lazyLoad', 'uiGmapgoogle-maps', 'ngImgCrop'])
    .config(['$stateProvider', '$urlRouterProvider', function(
        $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('megalitos', {
                url: '/megalitos',
                resolve: {
                    intro: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "cssMegalitos",
                            files: ["css/megalitos.css"]
                        });
                    }
                },
                views: {
                    "megalitos": {
                        templateUrl: "/views/main/main-megalitos.html",
                    }
                }
            }).state('megalito', {
                url: '/megalitos/:megalitoId',
                resolve: {
                    intro: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "cssMegalitos",
                            files: ["css/megalitos.css"]
                        });

                    }
                },
                views: {

                    "megalito": {
                        templateUrl: "/views/main/main-megalito.html",
                    }
                }
            })
            .state('megalitos-comunidad', {
                url: '/megalitos/comunidad/:comunidad',
                resolve: {
                    intro: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "cssMegalitos",
                            files: ["css/megalitos.css"]
                        });

                    }
                },
                views: {
                    "megalitos-comunidad": {
                        templateUrl: "/views/main/main-megalitos-comunidad.html"
                    }
                }
            })
            .state('map', {
                url: '/map',
                
                resolve: {
                    intro: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "cssMaps",
                            files: ["css/megalitos.css"]
                        });

                    }
                },

                views: {
                    "map": {
                        templateUrl: "/views/main/main-map.html",
                    }
                }
            })
            .state('megalitos-upload', {
                url: '/megalitos-upload',
                authenticate: true,
                resolve: {
                    intro: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "cssValidation",
                            files: ["css/megalitos.css"]
                        });

                    }
                },
                views: {
                    "megalitos-upload": {
                        templateUrl: "/views/main/main-megalitos-upload.html"
                    }


                }
            })
            .state('sign-up', {
                url: '/sign-up',
                resolve: {
                    intro: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "cssSignp",
                            files: ["css/megalitos.css"]
                        });

                    }
                },
                views: {
                    "sign-up": {
                        templateUrl: "views/main/main-sign-up.html"
                    }
                }
            })
            .state('avatar', {
                url: '/avatar',
                resolve: {
                    intro: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "cssSignp",
                            files: ["css/megalitos.css"]
                        });

                    }
                },
                views: {
                    "sign-up": {
                        templateUrl: "views/main/main-avatar.html"
                    }
                }
            });
        $urlRouterProvider.otherwise('megalitos');
    }])

.run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
        // redirect to login page if not logged in

        if (next.authenticate && !$rootScope.currentUser) {
            event.preventDefault(); //prevent current page from loading
            $state.go('sign-up');
        }
    });
}]);
