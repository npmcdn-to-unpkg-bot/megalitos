angular
    .module('app', ['ui.router', 'lbServices', 'ngCookies', 'angularFileUpload', 'angularMoment', 'angular.filter', 'bootstrapLightbox', 'oc.lazyLoad', 'uiGmapgoogle-maps'])
    .config(['$stateProvider', '$urlRouterProvider', function(
        $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('megalitos', {
                url: '/megalitos',
                
                views: {
                    "megalitos": {
                        templateUrl: "/views/main/main-megalitos.html"
                    }
                }
            }).state('megalito', {
                url: '/megalitos/:megalitoId',
                views: {

                    "megalito": {
                        templateUrl: "/views/main/main-megalito.html"
                    }
                }
            })
            .state('megalitos-comunidad', {
                url: '/megalitos/comunidad/:comunidad',
                views: {
                    "megalitos-comunidad": {
                        templateUrl: "/views/main/main-megalitos-comunidad.html"
                    }
                }
            })
            .state('map', {
                url: '/map',
                views: {
                    "map": {
                        templateUrl: "/views/main/main-map.html"
                    }
                }
            })
            .state('megalitos-upload', {
                url: '/megalitos-upload',
               // authenticate: true,
               
                views: {
                    "megalitos-upload": {
                        templateUrl: "/views/main/main-megalitos-upload.html"
                    }


                }
            })
            .state('sign-up', {
                url: '/sign-up',
                
                views: {
                    "sign-up": {
                        templateUrl: "views/main/main-sign-up.html"
                    }
                }
            })
            .state('avatar', {
                url: '/avatar',
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
