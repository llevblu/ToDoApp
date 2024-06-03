class Task {
    constructor(text, isCompleted = false) {
        this.text = text;
        this.isCompleted = isCompleted;
    }

    createTaskElement() {
        const task = document.createElement('div');
        task.className = `task ${this.isCompleted ? 'done' : 'todo'}`;

        const taskTitle = document.createElement('span');
        taskTitle.textContent = this.text;

        task.appendChild(taskTitle);

        if (!this.isCompleted) {
            const completeButton = document.createElement('button');
            completeButton.innerHTML = '&#10003;'; // Checkmark symbol
            completeButton.className = 'complete';
            completeButton.onclick = () => taskList.completeTask(task);

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '&#128465;'; // Trash can symbol
            deleteButton.className = 'delete';
            deleteButton.onclick = () => taskList.deleteTask(task);

            task.appendChild(completeButton);
            task.appendChild(deleteButton);
        }

        return task;
    }
}

class TaskList {
    constructor() {
        this.tasks = [];
        this.todoContainer = document.getElementById('todoContainer');
        this.doneContainer = document.getElementById('doneContainer');
        this.todoCount = document.getElementById('todoCount');
        this.doneCount = document.getElementById('doneCount');
    }

    addTask(text) {
        const newTask = new Task(text);
        this.tasks.push(newTask);
        this.render();
    }

    completeTask(taskElement) {
        const taskIndex = Array.from(this.todoContainer.children).indexOf(taskElement);
        if (taskIndex > -1) {
            this.tasks[taskIndex].isCompleted = true;
            this.render();
        }
    }

    deleteTask(taskElement) {
        const taskIndex = Array.from(this.todoContainer.children).indexOf(taskElement);
        if (taskIndex > -1) {
            this.tasks.splice(taskIndex, 1);
            this.render();
        }
    }

    render() {
        this.todoContainer.innerHTML = '';
        this.doneContainer.innerHTML = '';

        this.tasks.forEach(task => {
            const taskElement = task.createTaskElement();
            if (task.isCompleted) {
                this.doneContainer.appendChild(taskElement);
            } else {
                this.todoContainer.appendChild(taskElement);
            }
        });

        this.updateCounts();
    }

    updateCounts() {
        this.todoCount.textContent = this.tasks.filter(task => !task.isCompleted).length;
        this.doneCount.textContent = this.tasks.filter(task => task.isCompleted).length;
    }
}

const taskList = new TaskList();

document.getElementById('addTaskButton').addEventListener('click', () => {
    const inputField = document.getElementById('inputField');
    const taskText = inputField.value.trim();
    if (taskText) {
        taskList.addTask(taskText);
        inputField.value = '';
    } else {
        alert('Please enter a task.');
    }
});
