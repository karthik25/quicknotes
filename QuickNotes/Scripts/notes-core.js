var mainModule = angular.module("MainModule", []);

mainModule.controller("NotesController", function ($scope, $http, $timeout) {
    $scope.note = "";
    $scope.notes = [];

    $scope.noteAdded = false;

    $scope.busy = false;
    $scope.noteAdding = false;

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
});
