$(document).ready(function() {
    // Initialize localStorage if not exists
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([]));
    }

    // Register Form Submit
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        const username = $('#newUsername').val();
        const password = $('#newPassword').val();
        
        let users = JSON.parse(localStorage.getItem('users'));
        if (users.find(u => u.username === username)) {
            alert('Username already exists!');
            return;
        }
        
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        $.mobile.changePage('#loginPage');
    });

    // Login Form Submit
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        
        let users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            sessionStorage.setItem('currentUser', username);
            loadTasks();
            $.mobile.changePage('#tasksPage');
        } else {
            alert('Invalid credentials!');
        }
    });

    // Add Task
    $('#taskForm').on('submit', function(e) {
        e.preventDefault();
        const title = $('#taskTitle').val();
        const username = sessionStorage.getItem('currentUser');
        
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push({
            id: Date.now(),
            title,
            username,
            completed: false
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
        $('#taskTitle').val('');
    });

    // Load Tasks
    function loadTasks() {
        const username = sessionStorage.getItem('currentUser');
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        const userTasks = tasks.filter(t => t.username === username);
        
        $('#taskList').empty();
        userTasks.forEach(task => {
            $('#taskList').append(`
                <li>
                    <h2>${task.title}</h2>
                    <div class="ui-grid-a">
                        <div class="ui-block-a">
                            <button class="deleteTask ui-btn ui-btn-inline" data-task-id="${task.id}">Delete</button>
                        </div>
                        <div class="ui-block-b">
                            <input type="checkbox" data-task-id="${task.id}" class="completeTask" 
                                ${task.completed ? 'checked' : ''}>
                            <label>Complete</label>
                        </div>
                    </div>
                </li>
            `);
        });
        $('#taskList').listview('refresh');
    }

    // Delete Task
    $(document).on('click', '.deleteTask', function() {
        const taskId = $(this).data('task-id');
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks = tasks.filter(t => t.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    });

    // Toggle Task Completion
    $(document).on('change', '.completeTask', function() {
        const taskId = $(this).data('task-id');
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    });

    // Logout
    $('#logoutBtn').on('click', function() {
        sessionStorage.removeItem('currentUser');
        $.mobile.changePage('#loginPage');
    });
});