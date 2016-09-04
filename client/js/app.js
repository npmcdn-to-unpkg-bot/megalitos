angular
    .module('app', ['ui.router', 'lbServices', 'angularFileUpload', 'angularMoment', 'angular.filter', 'jkuri.gallery', 'oc.lazyLoad', 'uiGmapgoogle-maps', 'ngImgCrop', '720kb.socialshare', 'datatables', 'datatables.buttons','ngAnimate', 'ngMaterial','toastr','angularValidator'])
    .config(['$stateProvider', '$urlRouterProvider', function(
        $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('megalitos', {
                url: '/megalitos',
                templateUrl: "/views/bundle/megalitos-bundle.html",
                controller: 'MegalitosController'

            }).state('megalito', {
                url: '/megalitos/:megalitoId',
                templateUrl: "/views/bundle/megalito-bundle.html",
                authenticate: true,
            })
            .state('megalitos-comunidad', {
                url: '/megalitos/comunidad/:comunidad',
               templateUrl: "/views/bundle/megalitos-bundle.html",
               controller: 'MegalitosComunidadController'
            })
            .state('map', {
                url: '/map/:clase',
                templateUrl: "/views/bundle/map-bundle.html"
               
            })
            .state('megalito-upload', {
                url: '/megalito-upload',
                templateUrl: "/views/bundle/megalito-upload-bundle.html"
                // authenticate: true,

            })
            .state('sign-up', {
                url: '/sign-up',
                templateUrl: "views/bundle/sign-up-bundle.html"
            })
            .state('user', {
                url: '/usuario',
                templateUrl: "views/bundle/user-config-bundle.html"
            })
            .state('favourites', {
                url: '/favoritos',
                templateUrl: "views/bundle/favourites-bundle.html"
            })
            .state('user-edit-megalito-upload', {
                url: '/usuario/editar/:megalitoId',
                templateUrl: "/views/bundle/user-edit-megalito-upload-bundle.html",
                authenticate: true,
            })
            .state('admin-users', {
                url: '/usuarios',
                templateUrl: "/views/bundle/admin-users-bundle.html"
                //authenticate: true,
               
            }).state('admin-megalitos', {
                url: '/admin-megalitos',
                templateUrl: "/views/bundle/admin-megalitos-bundle.html"
                //authenticate: true,
               
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
