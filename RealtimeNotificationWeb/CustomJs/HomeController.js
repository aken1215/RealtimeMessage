var notificationApp = angular.module('Notification', [])
    notificationApp.value('$',$);
    notificationApp.controller('HomeController', ['$scope', 'signalRSvc', function ($scope, signalRSvc) {
        $.noty.defaults = {
            layout: 'bottomRight',
            theme: 'defaultTheme', // or 'relax'
            type: 'alert',
            text: '', // can be html or string
            dismissQueue: true, // If you want to use queue feature set this true
            template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
            animation: {
                open: 'animated rubberBand', // or Animate.css class names like: 'animated bounceInLeft'
                close: 'animated bounceOutLeft', // or Animate.css class names like: 'animated bounceOutLeft'
                easing: 'swing',
                speed: 500 // opening & closing animation speed
            },
            timeout: 3000, // delay for closing event. Set false for sticky notifications
            force: false, // adds notification to the beginning of queue when set to true
            modal: false,
            maxVisible: 5, // you can set max visible notification for dismissQueue true option,
            killer: false, // for close all notifications before show
            closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
            callback: {
                onShow: function () { },
                afterShow: function () { },
                onClose: function () { },
                afterClose: function () { },
                onCloseClick: function () { },
            },
            buttons: false // an array of buttons
        };

        $scope.greeting = 'Hola12223';

        $scope.sentMessage = function () {
            noty({ text: '您有一則新訊息</br></br>S0001請購單已送至您的簽呈信箱' });
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

