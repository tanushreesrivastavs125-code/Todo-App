const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const res = await fetch("https://todo-backend-slv2.onrender.com/api/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

    });

    const data = await res.json();

    if (res.ok) {

        localStorage.setItem("token", data.token);

        localStorage.setItem("name", data.user.name);

        alert("Login Successful");

        window.location.href = "dashboard.html";

    } else {

        alert(data.message);

    }

});