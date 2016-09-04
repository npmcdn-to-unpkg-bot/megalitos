angular
    .module('app')
    .factory('AuthService', ['$q', '$rootScope', 'User', function($q,
        $rootScope, User) {
        function login(email, password) {
            return User
                .login({ email: email, password: password })
                .$promise
                .then(function(response) {
                    console.log("login");
                    console.log(response);
                    $rootScope.currentUser = {
                        id: response.user.id,
                        tokenId: response.id,
                        email: response.user.email,
                        username: response.user.username,
                        avatar: response.user.avatar,
                        aboutYourself: response.user.aboutYourself
                    };
                    window.localStorage.setItem("key", JSON.stringify({ username: $rootScope.currentUser.username, email: $rootScope.currentUser.email, password: password }));
                });
        }

        function logout() {
            return User
                .logout()
                .$promise
                .then(function() {
                    $rootScope.currentUser = null;
                });
        }

        function register(username, email, password, aboutYourself) {
            return User
                .create({
                    username: username,
                    email: email,
                    password: password,
                    aboutYourself: aboutYourself
                })
                .$promise.then(function(user) {
                    console.log(user);
                    //window.localStorage.setItem("key", JSON.stringify({ username: user.username, email: user.email, password: user.password }));
                });
        }

        function restartPassword(email) {
            return User
                .resetPassword({
                    email: email

                })
                .$promise;
        }

        return {
            login: login,
            logout: logout,
            register: register,
            restartPassword: restartPassword
        };
    }]);
