angular
    .module('app', ['ui.router', 'lbServices', 'ngCookies', 'angularFileUpload', 'angularMoment', 'angular.filter', 'bootstrapLightbox', 'oc.lazyLoad', 'uiGmapgoogle-maps','ngImgCrop','720kb.socialshare','datatables','datatables.buttons'])
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
                authenticate: true,
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
                url: '/map/:clase',
                views: {
                    "map": {
                        templateUrl: "/views/main/main-map.html"
                    }
                }
            })
            .state('megalito-upload', {
                url: '/megalito-upload',
               // authenticate: true,
               
                views: {
                    "megalito-upload": {
                        templateUrl: "/views/main/main-megalito-upload.html"
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
            .state('user', {
                url: '/usuario',
                views: {
                    "user": {
                        templateUrl: "views/main/main-user-config.html"
                    }
                }
            })
            .state('favourites', {
                url: '/favoritos',
                views: {
                    "favourites": {
                        templateUrl: "views/main/main-favourites.html"
                    }
                }
            })
           .state('user-edit-megalito-upload', {
                url: '/usuario/editar/:megalitoId',
                authenticate: true,
                views: {    
                    "user-edit-megalito-upload": {
                        templateUrl: "/views/main/main-user-edit-megalito-upload.html"
                    }
                }
            })
           .state('admin-users', {
                url: '/usuarios',
                //authenticate: true,
                views: {    
                    "admin-users": {
                        templateUrl: "/views/main/main-admin-users.html"
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
