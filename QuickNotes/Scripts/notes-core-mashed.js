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
    var data = {
        DefaultView: 'sticky'
    };

    return {
        getDefaultView: function () {
            return data.DefaultView;
        },
        setDefaultView: function (defaultView) {
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

    $scope.loadDefaultView = function() {
        var defaultView = appSettingsFactory.getDefaultView();
        if (defaultView != '') {
            $location.path('/' + defaultView);
        }
    };

    $scope.loadDefaultView();
});
