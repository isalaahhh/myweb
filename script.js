function hitung(operator) {
    const angka1Input = document.getElementById('angka1');
    const angka2Input = document.getElementById('angka2');
    const hasilSpan = document.getElementById('hasil');

    if (!angka1Input || !angka2Input || !hasilSpan) {
        console.error("Kesalahan: Elemen 'angka1', 'angka2', atau 'hasil' tidak ditemukan di HTML.");
        return;
    }

    const angka1 = parseFloat(angka1Input.value);
    const angka2 = parseFloat(angka2Input.value);

    if (isNaN(angka1) || isNaN(angka2)) {
        hasilSpan.textContent = "Input tidak valid";
        return;
    }

    let hasil;

    switch (operator) {
        case '+':
            hasil = angka1 + angka2;
            break;
        case '-':
            hasil = angka1 - angka2;
            break;
        case '*':
            hasil = angka1 * angka2;
            break;
        case '/':
            if (angka2 === 0) {
                hasilSpan.textContent = "Tidak bisa dibagi nol";
                return;
            }
            hasil = angka1 / angka2;
            break;
        default:
            hasilSpan.textContent = "Operator tidak dikenal";
            return;
    }

    hasilSpan.textContent = hasil;
}

const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

if (todoInput && addButton && todoList) {
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') {
            alert('Please enter a task!');
            return;
        }

        const listItem = document.createElement('li');
        listItem.classList.add('todo-item');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = todoText;
        taskSpan.addEventListener('click', () => {
            listItem.classList.toggle('completed');
            saveTodos();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            listItem.remove();
            saveTodos();
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
        todoInput.value = '';
        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll('.todo-item').forEach(item => {
            const textElement = item.querySelector('span');
            if (textElement) {
                 todos.push({
                    text: textElement.textContent,
                    completed: item.classList.contains('completed')
                });
            }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos'));

        if (todos) {
            todos.forEach(todo => {
                const listItem = document.createElement('li');
                listItem.classList.add('todo-item');
                if (todo.completed) {
                    listItem.classList.add('completed');
                }

                const taskSpan = document.createElement('span');
                taskSpan.textContent = todo.text;
                taskSpan.addEventListener('click', () => {
                    listItem.classList.toggle('completed');
                    saveTodos();
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    listItem.remove();
                    saveTodos();
                });

                listItem.appendChild(taskSpan);
                listItem.appendChild(deleteButton);
                todoList.appendChild(listItem);
            });
        }
    }

    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    document.addEventListener('DOMContentLoaded', loadTodos);
}