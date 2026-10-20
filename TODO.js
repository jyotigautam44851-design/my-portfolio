let tasks = [];

function addTask() {

    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    input.value = "";

    displayTasks();
}


function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const span = document.createElement("span");

        span.textContent = task.text;
        span.className = "task-text";

        if (task.completed) {
            span.classList.add("completed");
        }

        // Mark task as completed
        span.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            displayTasks();
        };


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.onclick = function () {
            tasks.splice(index, 1);
            displayTasks();
        };


        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateTaskCount();
}


function updateTaskCount() {

    const count = document.getElementById("taskCount");

    count.textContent =
        tasks.length + (tasks.length === 1 ? " Task" : " Tasks");
}


function clearAll() {

    if (tasks.length === 0) {
        return;
    }

    if (confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        displayTasks();
    }
}


// Press Enter to add task
document.getElementById("taskInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});