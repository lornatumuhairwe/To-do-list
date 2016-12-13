/**
 * Created by ltumuhairwe on 12/13/16.
 */
$( function() {
    $( "#datepicker" ).datepicker();

    getTasks();
    var addButton = document.getElementById("addButton");

    var addTask = document.getElementById("add-task");
    addButton.onclick = function () {
        window.event.preventDefault();
        var data = new FormData(addTask);
        var req= new XMLHttpRequest();
        req.onreadystatechange = function () {
            getTasks();
        };
        req.send(data);
    }
} );

function getTasks() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){

            var tasks = document.getElementById("tasks");
            jsonItems = JSON.parse(this.responseText);

            getTasks2(function (taskString) {
                tasks.innerHTML = taskString;
            })
        }
    };
    xhttp.open("GET", "/get-data", true);
    xhttp.send();
}

function getTasks2 (callback) {
    var taskString = '';
    for (i=0; i<jsonItems.length; i++){
        taskString += "<article class='item'>\
                <div>Task: "+jsonItems[i].title+"</div>\
                <div>Details: "+jsonItems[i].details+"</div>\
                <div>Assigned to: "+jsonItems[i].toDoTask+"</div>\
                <div>Author: "+jsonItems[i].author+"</div>\
                <div>Status: "+jsonItems[i].status+"</div>\
                <div>Due Date: "+jsonItems[i].datepicker+"</div>\
                <form action='delete' method='post'>\
                <button type='submit'>Delete</button>\
                <input type='hidden' name='task' value='"+jsonItems[i]._id+"' />\
                </form>\
                <form action='complete' method='post'>\
                <button type='submit'>Complete</button>\
                <input type='hidden' name='task' value='"+jsonItems[i]._id+"' />\
                </form>\
                </article>";
        if (i===(jsonItems.length-1)){
            callback(taskString);
        }
    }
}