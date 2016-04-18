var notificationApp = angular.module('Notification', [])
    notificationApp.value('$',$);
    notificationApp.controller('HomeController', ['$scope', 'signalRSvc', function ($scope, signalRSvc) {
        $scope.greeting = 'Hola12223';

        $scope.sentMessage = function () {
            signalRSvc.sentMessage($('#sendMessage').val());
        }

        updateData = function (text) {
            $scope.text = text;
        }

        signalRSvc.initialize(updateData);
    }]).factory('signalRSvc', function ($, $rootScope) {
        return {
            proxy: null,
            initialize: function (updateData) {

                //Gettiong the connection object 
                connection = $.hubConnection();
                //connection.url = "~/signalr"
                //Creating proxy
                this.proxy = connection.createHubProxy('notificationHub');

                //Starting connection
                console.log(123);   
                connection.start();

                //Attaching a callback to handle updateData client call

                this.proxy.on('updateData', function (msg) {
                    $rootScope.$apply(function () {
                        updateData(msg);
                    });
                });
            },
            sentMessage: function (para1) {
                //Invoking getMessage method defined in hub
                this.proxy.invoke('sentMessage', para1);
            },
        }
    });

