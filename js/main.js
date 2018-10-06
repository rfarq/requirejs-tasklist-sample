require.config({
    paths: {
        jquery: 'jquery-2.1.1.min'
    }
});

define("taskData", [], function() {
    "use strict";

    /* load and save data */

    var STORE_NAME = "tasks";

    function saveTaskData (tasks) {
        localStorage.setItem(STORE_NAME, JSON.stringify(tasks));
    }

    function loadTaskData () {
        var storedTasks = localStorage.getItem(STORE_NAME);
        if(storedTasks) {
            return JSON.parse(storedTasks);
        }
        return [];
    }

    function clearTaskData () {
        localStorage.removeItem(STORE_NAME);
    }

    return {
        save: saveTaskData,
        load: loadTaskData,
        clear: clearTaskData
    };
});

require(["jquery", "taskData"], function ($, taskData) {

    /* create DOM task elements */

    var taskTemplate = '<li class="task"><input class="complete" type="checkbox" /> <input class="description" type="text" placeholder="Enter task description..." /> <button class="delete-button">Delete</button></li>';

    function renderTasks(tasks) {
        var elementArray = $.map(tasks, _renderTask);

        $("#task-list")
            .empty()
            .append(elementArray);
    }

    function renderNew() {
        var $taskList = $("#task-list");
        $taskList.prepend(_renderTask({}));
    }

    function _renderTask(task) {
        var $task = $(taskTemplate);
        if(task.complete) {
            $task.find(".complete").attr("checked", "checked");
        }
        $task.find(".description").val(task.description);
        return $task;
    }

    /* task management */

    function add() {
        renderNew();
    }

    function remove(clickEvent) {
        var taskElement = clickEvent.target;
        $(taskElement).closest(".task").remove();
    }

    function clear() {
        taskData.clear();
        render();
    }

    function save() {
        var tasks = [];
        $("#task-list .task").each(function (index, task) {
            var $task = $(task);
            tasks.push({
                complete: $task.find(".complete").prop('checked'),
                description: $task.find(".description").val()
            });
        });

        taskData.save(tasks);
    }

    function cancel() {
        render();
    }

    function render() {
        renderTasks(taskData.load());
    }

    /* register event handlers */

    function registerEventHandlers() {
        $("#new-task-button").on("click", add);
        $("#delete-all-button").on("click", clear);
        $("#save-button").on("click", save);
        $("#cancel-button").on("click", cancel);
        $("#task-list").on("click", ".delete-button", remove);
    }

    /* initialize application */

    $(function () {
        registerEventHandlers();
        render();
    });
});