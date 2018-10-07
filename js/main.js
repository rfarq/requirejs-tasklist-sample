require.config({
    paths: {
        jquery: 'jquery-2.1.1.min'
    }
});

define("app", function (require, exports, module) {
    var $ = require("jquery");
    var tasks = require("tasks");

    function _addTask() {
        tasks.add();
    }

    function _deleteAllTasks() {
        tasks.clear();
    }

    function _saveChanges() {
        tasks.save();
    }

    function _cancelChanges() {
        tasks.cancel();
    }

    function _deleteTask(clickEvent) {
        tasks.remove(clickEvent);
    }

    function _registerEventHandlers() {
        $("#new-task-button").on("click", _addTask);
        $("#delete-all-button").on("click", _deleteAllTasks);
        $("#save-button").on("click", _saveChanges);
        $("#cancel-button").on("click", _cancelChanges);
        $("#task-list").on("click", ".delete-button", _deleteTask);
    }

    exports.init =  function () {
        _registerEventHandlers();
        tasks.render();
    };
});

require(["app"], function (app) {
    app.init();
});