var app = angular.module("GF", ["ngRoute","AuthModule"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html"
        })
        .when("/session", {
            templateUrl: "components/session/session.html",
            controller: "SessionController"
        })
});
