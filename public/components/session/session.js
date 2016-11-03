var app = angular.module("AuthModule", []);

app.service("SessionService", ["$http", function ($http) {
    this.getSession = function () {
        return $http.get("/api/session").then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }

    this.saveSession = function (todo) {
        return $http.post("/api/session", session).then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };
}])

app.controller("SessionController", ["$scope", "$http", "SessionService", function ($scope, $http, SessionService) {
    $scope.session = {};
    $scope.sessions = [];

    // define and immediately invoke this function when the
    // page loads to get the list of todos from the server
    (function getSession() {
        SessionService.getSession().then(function (sessions) {
            $scope.sessions = sessions;
        });
    })();
}]);
