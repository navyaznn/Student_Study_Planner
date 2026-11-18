// Get HTML elements

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const taskCount = document.getElementById("taskCount");


// Get saved tasks or create sample tasks

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [
    { text: "Revise Indian Polity", completed: true },
    { text: "Complete Geography Notes", completed: true },
    { text: "Solve Previous Year Questions", completed: false },
    { text: "Prepare College Presentation", completed: false }
];


// Save tasks in browser storage

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}


// Display tasks on the website

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-check";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Task text

        const span = document.createElement("span");
        span.className = "task-label";
        span.textContent = task.text;

        // Delete button

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        // Add elements to the list

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateProgress();
}


// Add a new task

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (taskName !== "") {

        tasks.push({
            text: taskName,
            completed: false
        });

        saveTasks();

        displayTasks();

        taskInput.value = "";
    }
});


// Calculate study progress

function updateProgress() {

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    let percentage = 0;

    if (totalTasks > 0) {
        percentage = Math.round(
            (completedTasks / totalTasks) * 100
        );
    }

    progressFill.style.width = percentage + "%";

    progressText.textContent = percentage + "% Completed";

    taskCount.textContent =
        completedTasks + " of " + totalTasks + " tasks completed";
}


// Display current date

const today = new Date();

document.getElementById("todayDate").textContent =
    "Today's Date: " + today.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });


// Feedback form

const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const studentName =
        document.getElementById("studentName").value.trim();

    document.getElementById("feedbackMessage").textContent =
        "Thank you, " + studentName + "! Your feedback has been received.";

    feedbackForm.reset();
});


// Display saved tasks when website opens

displayTasks();
// Editable Study Timetable

const studyTable = document.getElementById("studyTable");

// Load previously saved timetable

const savedTimetable = JSON.parse(
    localStorage.getItem("studyTimetable")
);

// Make timetable cells editable

const timetableCells = studyTable.querySelectorAll("td");

timetableCells.forEach((cell, index) => {

    cell.contentEditable = "true";

    // Restore previously saved information

    if (savedTimetable && savedTimetable[index] !== undefined) {
        cell.textContent = savedTimetable[index];
    }

    // Save changes automatically

    cell.addEventListener("input", function() {

        const updatedTimetable = Array.from(timetableCells).map(
            cell => cell.textContent
        );

        localStorage.setItem(
            "studyTimetable",
            JSON.stringify(updatedTimetable)
        );

    });

});