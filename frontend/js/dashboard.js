const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

const input = document.getElementById("task");

const list = document.getElementById("todoList");

const addBtn = document.getElementById("addBtn");

// Load Todos

async function loadTodos() {

    const res = await fetch("http://localhost:5000/api/todos", {

        headers: {

            Authorization: token

        }

    });

    const todos = await res.json();

    list.innerHTML = "";

    todos.forEach(todo => {

    list.innerHTML += `
<li>
    <input
        type="checkbox"
        ${todo.completed ? "checked" : ""}
        onclick="toggleTodo('${todo._id}', ${todo.completed})"
    >

    <span style="${todo.completed ? "text-decoration: line-through;" : ""}">
        ${todo.title}
    </span>

    <button onclick="editTodo('${todo._id}','${todo.title}')">
        Edit
    </button>

    <button onclick="deleteTodo('${todo._id}')">
        Delete
    </button>
</li>
`;

    });

}

loadTodos();


// Add Todo

addBtn.addEventListener("click", async () => {

    const title = input.value;

    if (!title) return;

    await fetch("http://localhost:5000/api/todos", {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            Authorization: token

        },

        body: JSON.stringify({

            title

        })

    });

    input.value = "";

    loadTodos();

});


// Delete Todo

async function deleteTodo(id) {

    await fetch(`http://localhost:5000/api/todos/${id}`, {

        method: "DELETE",

        headers: {

            Authorization: token

        }

    });

    loadTodos();

}

async function editTodo(id, oldTitle) {

    // alert("Edit button clicked");

    const newTitle = prompt("Edit Todo", oldTitle);

    if (!newTitle) return;

    await fetch(`http://localhost:5000/api/todos/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",

            Authorization: token

        },

        body: JSON.stringify({

            title: newTitle

        })

    });

    loadTodos();

}

document.getElementById("logout").addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

async function toggleTodo(id, completed) {

    await fetch(`http://localhost:5000/api/todos/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",

            Authorization: token

        },

        body: JSON.stringify({

            completed: !completed

        })

    });

    loadTodos();

}