const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const editModal = document.getElementById('editModal');
const editedTask = document.getElementById('editedTask');
const editedPriority = document.getElementById('editedPriority');
const editedStatus = document.getElementById('editedStatus');
const saveEditButton = document.getElementById('saveEditButton');
const cancelEditButton = document.getElementById('cancelEditButton');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text, priority, status) {
    const task = {
        text,
        priority,
        status,
        id: Date.now(),
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    document.getElementById('taskPriority').selectedIndex = 0;
    document.getElementById('taskStatus').selectedIndex = 0;
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-title">Task:<br>${task.text}</span>
            <span class="task-priority">Priority: ${task.priority}</span>
            <div class="ui-box">
                <span class="status">${task.status}</span>
            </div>
            <button class="editTaskButton" data-id="${task.id}">Edit</button>
            <button class="deleteTaskButton" data-id="${task.id}">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function editTask(id, newText, newPriority, newStatus) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].text = newText;
        tasks[taskIndex].priority = newPriority;
        tasks[taskIndex].status = newStatus;
        saveTasks();
        renderTasks();
        closeEditModal();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

addTaskButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    const priority = document.getElementById('taskPriority').value;
    const status = document.getElementById('taskStatus').value;
    if (text !== '') {
        addTask(text, priority, status);
    }
});

taskList.addEventListener('click', event => {
    if (event.target.classList.contains('deleteTaskButton')) {
        const id = parseInt(event.target.getAttribute('data-id'));
        deleteTask(id);
    } else if (event.target.classList.contains('editTaskButton')) {
        const id = parseInt(event.target.getAttribute('data-id'));
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            editedTask.value = taskToEdit.text;
            editedPriority.value = taskToEdit.priority;
            editedStatus.value = taskToEdit.status;
            openEditModal(id);
        }
    }
});

saveEditButton.addEventListener('click', () => {
    const editedText = editedTask.value.trim();
    const newPriority = editedPriority.value;
    const newStatus = editedStatus.value;
    if (editedText !== '') {
        const id = parseInt(editModal.getAttribute('data-id'));
        editTask(id, editedText, newPriority, newStatus);
    }
});

cancelEditButton.addEventListener('click', () => {
    closeEditModal();
});

function openEditModal(id) {
    editModal.setAttribute('data-id', id);
    editModal.style.display = 'block';
}

function closeEditModal() {
    editModal.removeAttribute('data-id');
    editModal.style.display = 'none';
}

renderTasks();
