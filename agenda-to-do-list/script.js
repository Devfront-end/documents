// script.js
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="doneBtn">Done</button>
            <button class="deleteBtn">Delete</button>
            <button class="updateBtn">Update</button>
        `;
        taskList.appendChild(li);
        taskInput.value = "";
    }
});

taskList.addEventListener("click", (event) => {
    const taskItem = event.target.parentElement;
    if (event.target.classList.contains("doneBtn")) {
        taskItem.classList.toggle("done");
        taskItem.style.backgroundColor = "green";
        taskItem.querySelector(".updateBtn").style.display = "block";
        taskItem.querySelector(".deleteBtn").style.display = "block";
        alert("Task marked as done!");
    } else if (event.target.classList.contains("deleteBtn")) {
        taskList.removeChild(taskItem);
        alert("Task deleted!");
    } else if (event.target.classList.contains("updateBtn")) {
        alert("Task updated!");
    }
});

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="taskCheckbox">
            <span>${taskText}</span>
            <button class="doneBtn">Done</button>
            <button class="deleteBtn">Delete</button>
            <button class="updateBtn">Update</button>
        `;
        taskList.appendChild(li);
        taskInput.value = "";
    }
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("doneBtn")) {
        const taskItem = event.target.parentElement;
        taskItem.classList.toggle("done");
    } else if (event.target.classList.contains("deleteBtn")) {
        const taskItem = event.target.parentElement;
        taskList.removeChild(taskItem);
    }
});
