document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const progressText = document.getElementById("task-progress");
const progressBar = document.getElementById("progress-bar");

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const taskItem = document.createElement("li");
    taskItem.classList.add("task");
    taskItem.innerHTML = `
        <input type="checkbox" class="task-check">
        <span>${taskText}</span>
        <button class="delete-task">🗑️</button>
    `;

    taskList.appendChild(taskItem);
    saveTasks();
    taskInput.value = "";

    updateProgress();
}

taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-task")) {
        e.target.parentElement.remove();
    } else if (e.target.classList.contains("task-check")) {
        e.target.nextElementSibling.classList.toggle("completed");
    }
    saveTasks();
    updateProgress();
});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task").forEach((task) => {
        tasks.push({
            text: task.children[1].innerText,
            completed: task.children[0].checked,
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(({ text, completed }) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task");
        taskItem.innerHTML = `
            <input type="checkbox" class="task-check" ${completed ? "checked" : ""}>
            <span class="${completed ? "completed" : ""}">${text}</span>
            <button class="delete-task">🗑️</button>
        `;
        taskList.appendChild(taskItem);
    });
    updateProgress();
}

function updateProgress() {
    const tasks = document.querySelectorAll(".task");
    const completedTasks = document.querySelectorAll(".task-check:checked").length;
    const totalTasks = tasks.length;
    
    progressText.textContent = `${completedTasks}/${totalTasks}`;
    progressBar.value = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
}
