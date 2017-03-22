var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Services

weatherApp.service("cityService", function() {
    this.city = "Lahore";
});

weatherApp.factory('weatherService', ['$resource', function($resource) {
    var data = $resource(
        'http://api.openweathermap.org/data/2.5/forecast/daily',
        {}
    );
    return data;
}]);

// Routes
weatherApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    });

    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
}]);

// Controllers
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, $cityService) {
    $scope.city = $cityService.city;
    $scope.$watch('city', function() {
        $cityService.city = $scope.city;
    });

    $scope.submit = function() {
        $location.path("/forecast");
    }
}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', 'cityService', 'weatherService', function($scope, $routeParams, cityService, weatherService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    $scope.weather = weatherService.get({q: $scope.city, cnt: $scope.days, APPID: '75622b9e4e4fb3a9e3c642a295452821'});

    //console.log($scope.days);
    

    $scope.convertToCelcius = function(temp) {
        return Math.round(temp - 273.15);
    }

    $scope.convertToDate = function(data) {
        return new Date(data * 1000);
    }
 
}]);

