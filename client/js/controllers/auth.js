angular
    .module('app')
    .controller('AuthLoginController', ['$scope', '$rootScope', '$http', 'User', '$cookies', 'AuthService', '$state',
        function($scope, $rootScope, $http, User, $cookies, AuthService, $state) {
            $scope.loginAuto = function() {
                console.log("beti");
                if (window.localStorage.getItem("key")) {
                    userLocal = JSON.parse(window.localStorage.getItem("key"));
                    $scope.user = {
                        email: userLocal.email,
                        password: userLocal.password
                    };
                    AuthService.login($scope.user.email, $scope.user.password)
                        .then(function() {
                            $scope.currentUser = $rootScope.currentUser;
                            //$state.go('megalitos');

                        });
                }


            };
            $scope.login = function() {
                console.log("login");
                AuthService.login($scope.user.email, $scope.user.password)
                    .then(function() {
                        $scope.currentUser = $rootScope.currentUser;
                        //$state.go('megalitos');
                        $state.go($state.current, {}, { reload: true });
                    });
            };
            $scope.logout = function() {
                AuthService.logout()
                    .then(function() {
                        window.localStorage.clear();
                        $scope.currentUser = $rootScope.currentUser;
                        $scope.user = null;
                        window.location.reload();
                    });
            };

            /* if (AuthService.currentUser === null) {
      if ($cookies.access_token) {
        $scope.currentUser =
          AuthService.currentUser = { id: 'social' };
      }
    }
     AuthService.ensureHasCurrentUser(User);
    $scope.currentUser = AuthService.currentUser;
   


    /*$http.get('/auth/account')
            .then(function(response) {
              console.log(response);
              console.log(response.data);
            });
            */

        }
    ])

.controller('SignUpController', ['$scope', 'AuthService', '$state',
    function($scope, AuthService, $state) {
        //animacion para registrarse

        /* $scope.user = {
             name: 'markel',
             lastName: 'mendizabal',
             username: 'markelor',
             email: 'mendimarkel@gmail.com',
             password: 'abcdef',
             repeatPassword: 'abcdef',
             aboutYourself: 'ni informatikaria naiz'
         };
         */
        $scope.user = {
            username: 'markelor',
            email: 'mendimarkel@gmail.com',
            password: 'jaijaijai',
            aboutYourself: 'ni informatikaria naiz'
        };


        $scope.register = function() {
            AuthService.register($scope.user.username, $scope.user.email, $scope.user.password, $scope.user.aboutYourself)
                .then(function(user) {


                    },
                    function(reason) {
                        console.log(reason);
                    });

        };
    }
]);