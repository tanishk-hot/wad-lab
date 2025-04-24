class TodoList {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoForm = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');
        
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        this.simulateAjax('save', { todos: this.todos });
    }

    render() {
        this.todoList.innerHTML = '';
        this.todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `list-group-item todo-item ${todo.completed ? 'completed' : ''}`;
            
            if (todo.editing) {
                li.innerHTML = `
                    <input type="text" class="form-control edit-input" value="${todo.text}">
                    <div class="todo-actions">
                        <button class="btn btn-success btn-sm save-btn">Save</button>
                        <button class="btn btn-secondary btn-sm cancel-btn">Cancel</button>
                    </div>
                `;

                const saveBtn = li.querySelector('.save-btn');
                const cancelBtn = li.querySelector('.cancel-btn');
                const input = li.querySelector('.edit-input');

                saveBtn.addEventListener('click', () => this.updateTodo(index, input.value));
                cancelBtn.addEventListener('click', () => this.cancelEdit(index));
            } else {
                li.innerHTML = `
                    <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-text">${todo.text}</span>
                    <div class="todo-actions">
                        <button class="btn btn-primary btn-sm edit-btn">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                    </div>
                `;

                const checkbox = li.querySelector('.todo-checkbox');
                const editBtn = li.querySelector('.edit-btn');
                const deleteBtn = li.querySelector('.delete-btn');

                checkbox.addEventListener('change', () => this.toggleComplete(index));
                editBtn.addEventListener('click', () => this.editTodo(index));
                deleteBtn.addEventListener('click', () => this.deleteTodo(index));
            }

            this.todoList.appendChild(li);
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (text) {
            this.todos.push({
                text,
                completed: false,
                editing: false
            });
            this.todoInput.value = '';
            this.saveTodos();
            this.render();
        }
    }

    editTodo(index) {
        this.todos[index].editing = true;
        this.render();
    }

    updateTodo(index, newText) {
        if (newText.trim()) {
            this.todos[index].text = newText.trim();
            this.todos[index].editing = false;
            this.saveTodos();
            this.render();
        }
    }

    cancelEdit(index) {
        this.todos[index].editing = false;
        this.render();
    }

    deleteTodo(index) {
        this.todos.splice(index, 1);
        this.saveTodos();
        this.render();
    }

    toggleComplete(index) {
        this.todos[index].completed = !this.todos[index].completed;
        this.saveTodos();
        this.render();
    }

    simulateAjax(action, data) {
        console.log(`AJAX ${action} request:`, data);
        return new Promise(resolve => setTimeout(resolve, 500));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const todoList = new TodoList();
});