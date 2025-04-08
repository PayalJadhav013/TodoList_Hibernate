document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const tasksTableBody = document.getElementById('tasksTableBody');
    
    // Load tasks when page loads
    loadTasks();
    
    // Handle form submission
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;
        
        const task = {
            title: title,
            description: description,
            dueDate: dueDate,
            isCompleted: false
        };
        
        fetch('/todolist/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(data => {
            loadTasks();
            taskForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });
    
    // Load tasks from API
    function loadTasks() {
        fetch('/todolist/api/tasks')
            .then(response => response.json())
            .then(tasks => {
                tasksTableBody.innerHTML = '';
                tasks.forEach(task => {
                    addTaskToTable(task);
                });
            })
            .catch(error => console.error('Error:', error));
    }
    
    // Add a task to the table
    function addTaskToTable(task) {
        const row = document.createElement('tr');
        if (task.isCompleted) {
            row.classList.add('completed');
        }
        
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description || ''}</td>
            <td>${formatDate(task.dueDate)}</td>
            <td>
                <input type="checkbox" ${task.isCompleted ? 'checked' : ''} 
                    onchange="toggleTaskStatus(${task.id}, this.checked)">
                ${task.isCompleted ? 'Completed' : 'Pending'}
            </td>
            <td class="actions">
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        
        tasksTableBody.appendChild(row);
    }
    
    // Format date for display
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
});

// Global functions for task actions
function toggleTaskStatus(taskId, isCompleted) {
    fetch(`/todolist/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isCompleted: isCompleted
        })
    })
    .then(response => {
        if (response.ok) {
            location.reload();
        }
    })
    .catch(error => console.error('Error:', error));
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        fetch(`/todolist/api/tasks/${taskId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                location.reload();
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

function editTask(taskId) {
    fetch(`/todolist/api/tasks/${taskId}`)
        .then(response => response.json())
        .then(task => {
            document.getElementById('title').value = task.title;
            document.getElementById('description').value = task.description || '';
            
            // Format date for input field (yyyy-mm-dd)
            const dueDate = new Date(task.dueDate);
            const formattedDate = dueDate.toISOString().split('T')[0];
            document.getElementById('dueDate').value = formattedDate;
            
            // Change form to update mode
            const form = document.getElementById('taskForm');
            form.dataset.editId = taskId;
            form.querySelector('button').textContent = 'Update Task';
            
            // Remove previous submit listener
            form.removeEventListener('submit', handleSubmit);
            
            // Add update listener
            function handleSubmit(e) {
                e.preventDefault();
                
                const updatedTask = {
                    title: document.getElementById('title').value,
                    description: document.getElementById('description').value,
                    dueDate: document.getElementById('dueDate').value,
                    isCompleted: task.isCompleted
                };
                
                fetch(`/todolist/api/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedTask)
                })
                .then(response => {
                    if (response.ok) {
                        location.reload();
                    }
                })
                .catch(error => console.error('Error:', error));
            }
            
            form.addEventListener('submit', handleSubmit);
        })
        .catch(error => console.error('Error:', error));
}