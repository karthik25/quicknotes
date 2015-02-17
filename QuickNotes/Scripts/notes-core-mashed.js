var mainModule = angular.module("MainModule", ['ngClipboard', 'ngRoute']);

mainModule.config(['$routeProvider','ngClipProvider', function ($routeProvider, ngClipProvider) {
    ngClipProvider.setPath("//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.swf");
    
    $routeProvider.when("/",
    {
        templateUrl: root + "static/templates/plain.html",
        controller: "NotesController"
    }).when("/sticky", {
        templateUrl: root + "static/templates/sticky.html",
        controller: "NotesController"
    });
}]);

mainModule.factory("appSettingsFactory", function () {
    var getFromLocalStorage = function () {
        if (typeof (localStorage) !== "undefined") {
            return localStorage.getItem("defaultView");
        } else {
            $log.info('Unable to get from the local storage');
            return '';
        }
    };

    var setToLocalStorage = function (viewName) {
        if (typeof (localStorage) !== "undefined") {
            localStorage.setItem("defaultView", viewName);
        } else {
            $log.info('Unable to add to the local storage');            
        }
    };
    var data = {
        DefaultView: getFromLocalStorage()
    };

    return {
        getDefaultView: function () {
            return data.DefaultView;
        },
        setDefaultView: function (defaultView) {
            setToLocalStorage(defaultView);
            data.DefaultView = defaultView;
        }
    };
});

mainModule.controller("NotesController", function ($scope, $http, $timeout, $location, $log, appSettingsFactory) {
    $scope.note = "";
    $scope.notes = [];

    $scope.noteAdded = false;

    $scope.busy = false;
    $scope.noteAdding = false;

    $scope.copy_status = false;
    $scope.sticky_active = appSettingsFactory.getDefaultView() == 'sticky';
    $scope.plain_active = appSettingsFactory.getDefaultView() == '';

    $scope.addNote = function () {
        $scope.noteAdding = true;
        $http({
            method: 'get',
            url: root + 'api/list/addnote?noteContent=' + $scope.note
        }).success(function (data) {
            $scope.noteAdding = false;
            $scope.noteAdded = true;
            $scope.getNotes();
            $timeout(function () {
                $scope.noteAdded = false;
            }, 2000);
        }).error(function (data) {

        });
    };

    $scope.getNotes = function () {
        $scope.busy = true;
        $http.get(root + 'api/list/getnotes').success(function (data, status, headers, config) {
            $scope.notes = data;
            $scope.busy = false;
        }).error(function (data, status, headers, config) {

        });
    };

    $scope.getNotes();

    $scope.selectNote = function (event) {
        selectNote(event.target);
    };

    $scope.removeNote = function (noteId) {
        $http.get(root + 'api/list/deletenote?noteId=' + noteId).success(function () {
            $scope.getNotes();
        }).error(function () {

        });
    };

    $scope.isFlashAvailable = function() {
        var hasFlash = false;
        try {
            var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (fo) {
                hasFlash = true;
            }
        }
        catch (e) {
            if (navigator.mimeTypes["application/x-shockwave-flash"] != undefined) {
                hasFlash = true;
            }
        }
        return hasFlash;
    };

    $scope.displayNotice = function() {
        $scope.copy_status = true;
        $timeout(function() {
            $scope.copy_status = false;
        }, 2000);
    };

    $scope.markStickyAsDefault = function () {
        $log.info('Setting sticky as the default');
        appSettingsFactory.setDefaultView('sticky');
    };

    $scope.markPlainAsDefault = function() {
        appSettingsFactory.setDefaultView('');
    };

    $scope.clearDefault = function() {
        appSettingsFactory.setDefaultView('');
    };

    $scope.showAdditionalOptions = function() {
        return typeof(localStorage) != "undefined";
    };

    $scope.setStickyAsActive = function() {
        $scope.sticky_active = true;
        $scope.plain_active = false;
    };

    $scope.setPlainAsActive = function() {
        $scope.plain_active = true;
        $scope.sticky_active = false;
    };
});

mainModule.controller("SettingsController", function ($scope, $log, $location, appSettingsFactory) {
    $scope.loadDefaultView = function () {
        var defaultView = appSettingsFactory.getDefaultView();
        if (defaultView != undefined && defaultView != '') {
            $log.info('LOG: Reloading the view');
            $location.path('/' + defaultView);
        }
    };

    $scope.loadDefaultView();
});
