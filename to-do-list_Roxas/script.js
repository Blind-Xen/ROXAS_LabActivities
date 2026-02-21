// Get references to HTML elements by their ID
const addBtn    = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList  = document.getElementById("taskList");
const clearBtn  = document.getElementById("clearBtn");

// Run addTask() when Add button is clicked
addBtn.addEventListener("click", addTask);

// Also run addTask() when user presses Enter
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    // Read what the user typed
    const text = taskInput.value.trim();

    // If empty, flash border red and stop
    if (text === "") {
        taskInput.style.borderColor = "#ff4444";
        setTimeout(function() {
            taskInput.style.borderColor = "#333";
        }, 800);
        return;
    }

    // Create the <li> and its inner elements
    const li        = document.createElement("li");
    const checkIcon = document.createElement("div");
    const taskText  = document.createElement("span");
    const deleteBtn = document.createElement("button");

    checkIcon.className   = "check-icon";
    taskText.className    = "task-text";
    taskText.textContent  = text;
    deleteBtn.textContent = "✕";
    deleteBtn.className   = "delete-btn";

    // Delete button — removes this li from the list
    deleteBtn.addEventListener("click", function(event) {
        event.stopPropagation(); // prevent li click from firing too
        li.remove();
        updateStats();
        updateEmptyState();
    });

    // Clicking the li toggles the completed class (strikethrough)
    li.addEventListener("click", function() {
        li.classList.toggle("completed");
        checkIcon.textContent = li.classList.contains("completed") ? "✓" : "";
        updateStats();
    });

    // Assemble and add to list
    li.appendChild(checkIcon);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();
    updateStats();
    updateEmptyState();
}

// Clear all completed tasks at once
clearBtn.addEventListener("click", function() {
    document.querySelectorAll("#taskList li.completed").forEach(function(item) {
        item.remove();
    });
    updateStats();
    updateEmptyState();
});

// Update the Total / Done / Pending counters
function updateStats() {
    const total   = document.querySelectorAll("#taskList li").length;
    const done    = document.querySelectorAll("#taskList li.completed").length;
    const pending = total - done;

    document.getElementById("statTotal").textContent   = total;
    document.getElementById("statDone").textContent    = done;
    document.getElementById("statPending").textContent = pending;
}

// Show empty message when no tasks exist
function updateEmptyState() {
    const total = document.querySelectorAll("#taskList li").length;
    document.getElementById("emptyState").style.display = total === 0 ? "block" : "none";
}

// Run once on load
updateEmptyState();