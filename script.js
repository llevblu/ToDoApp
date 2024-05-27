document.getElementById('addTaskButton').addEventListener('click', addTask);

function addTask() {
    const inputField = document.getElementById('inputField');
    const todoContainer = document.getElementById('todoContainer');

    if (inputField.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const task = document.createElement('div');
    task.className = 'task todo';

    const taskTitle = document.createElement('span');
    taskTitle.textContent = inputField.value;

    const completeButton = document.createElement('button');
    completeButton.innerHTML = '&#10003;';
    completeButton.className = 'complete';
    completeButton.onclick = function () {
        moveToDone(task, taskTitle);
    };

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&#128465;';
    deleteButton.className = 'delete';
    deleteButton.onclick = function () {
        task.remove();
        updateCounts();
    };

    task.appendChild(taskTitle);
    task.appendChild(completeButton);
    task.appendChild(deleteButton);

    todoContainer.appendChild(task);

    inputField.value = '';
    updateCounts();
}

function moveToDone(task, taskTitle) {
    const doneContainer = document.getElementById('doneContainer');
    task.className = 'task done';
    task.removeChild(task.querySelector('.complete'));
    task.removeChild(task.querySelector('.delete'));
    doneContainer.appendChild(task);
    updateCounts();
}

function updateCounts() {
    const todoContainer = document.getElementById('todoContainer');
    const doneContainer = document.getElementById('doneContainer');
    const todoCount = document.getElementById('todoCount');
    const doneCount = document.getElementById('doneCount');

    todoCount.textContent = todoContainer.childElementCount;
    doneCount.textContent = doneContainer.childElementCount;
}
