var app = angular.module('PromisesApp',['ngRoute']);

app.config(function($routeProvider){
        $routeProvider

                .when('/', {
                        templateUrl : 'views/home/home.html',
                        controller : 'HomeController'
                })

                
                .otherwise({ redirectTo: '/' });

           });