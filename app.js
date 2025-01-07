// Load local data or initialize if empty
const loadData = () => {
    const data = localStorage.getItem("notionData");
    return data ? JSON.parse(data) : { notes: [], tasks: [] };
};

// Save data to local storage
const saveData = (data) => {
    localStorage.setItem("notionData", JSON.stringify(data));
};

// Render Notes
const renderNotes = () => {
    const content = document.getElementById("content");
    const data = loadData();
    content.innerHTML = `
        <h2>Notes</h2>
        <textarea id="note-input" placeholder="Write a new note..."></textarea>
        <button id="add-note">Add Note</button>
        <ul>
            ${data.notes.map((note, index) => `
                <li>
                    ${note}
                    <button class="delete" data-index="${index}">Delete</button>
                </li>
            `).join("")}
        </ul>
    `;

    // Add Note
    document.getElementById("add-note").addEventListener("click", () => {
        const noteInput = document.getElementById("note-input").value.trim();
        if (noteInput) {
            data.notes.push(noteInput);
            saveData(data);
            renderNotes();
        }
    });

    // Delete Note
    document.querySelectorAll(".delete").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            data.notes.splice(index, 1);
            saveData(data);
            renderNotes();
        });
    });
};

// Render Tasks
const renderTasks = () => {
    const content = document.getElementById("content");
    const data = loadData();
    content.innerHTML = `
        <h2>Tasks</h2>
        <input type="text" id="task-input" placeholder="Enter a new task" />
        <button id="add-task">Add Task</button>
        <ul>
            ${data.tasks.map((task, index) => `
                <li>
                    <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}" />
                    ${task.text}
                    <button class="delete" data-index="${index}">Delete</button>
                </li>
            `).join("")}
        </ul>
    `;

    // Add Task
    document.getElementById("add-task").addEventListener("click", () => {
        const taskInput = document.getElementById("task-input").value.trim();
        if (taskInput) {
            data.tasks.push({ text: taskInput, completed: false });
            saveData(data);
            renderTasks();
        }
    });

    // Toggle Task Completion
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            const index = e.target.dataset.index;
            data.tasks[index].completed = e.target.checked;
            saveData(data);
            renderTasks();
        });
    });

    // Delete Task
    document.querySelectorAll(".delete").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            data.tasks.splice(index, 1);
            saveData(data);
            renderTasks();
        });
    });
};

// Handle Sync Placeholder
document.getElementById("sync-data").addEventListener("click", () => {
    alert("Sync functionality is not yet implemented!");
});

// Navigation
document.getElementById("notes-tab").addEventListener("click", renderNotes);
document.getElementById("tasks-tab").addEventListener("click", renderTasks);

// Load Notes by Default
window.onload = renderNotes;
