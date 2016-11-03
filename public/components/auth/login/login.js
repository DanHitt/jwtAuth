var app = angular.module("GF");

app.controller("LoginController", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {

    $scope.login = function (user) {
        UserService.login(user).then(function (response) {
            $location.path("/todo");
        }, function (response) {
            alert(response.data.message);
        });
    }
}]);
