document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  loadTasks();

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = todoInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      todoInput.value = "";
      saveTasks();
    }
  });

  function addTask(taskText, isCompleted = false) {
    const li = document.createElement("li");
    li.className = "todo-item";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    if (isCompleted) {
      li.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "X";
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    li.addEventListener("click", (event) => {
      if (event.target.tagName !== "BUTTON") {
        li.classList.toggle("completed");
        saveTasks();
      }
    });

    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".todo-item").forEach((item) => {
      tasks.push({
        text: item.querySelector("span").textContent,
        completed: item.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach((task) => addTask(task.text, task.completed));
    }
  }

  const helpBtn = document.getElementById("help-btn");
  const modalOverlay = document.getElementById("modal-overlay");
  const closeModalBtn = document.querySelector(".modal .close-btn");

  function openModal() {
    modalOverlay.classList.remove("hidden");
  }

  function closeModal() {
    modalOverlay.classList.add("hidden");
  }

  helpBtn.addEventListener("click", openModal);

  closeModalBtn.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
});
