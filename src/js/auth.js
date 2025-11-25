import { registerUser } from "/src/js/api/register.js";
import { loginUser } from "/src/js/api/login.js";

// REGISTER
const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userData = {
            name: document.getElementById("fname").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value,
        };

        try {
            await registerUser(userData);

            const loginResult = await loginUser({
                email: userData.email,
                password: userData.password,
            });

            localStorage.setItem("token", loginResult.data.accessToken);
            localStorage.setItem("user", JSON.stringify(loginResult.data));

            registerMessage.textContent = "Registration successful, you are now logged in to your new account";

            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        } catch (error) {
            registerMessage.textContent = `Registration failed. ${error.message}`;
        }
    });
}


// Login
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userData = {
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value,
        };

        try {
            const loginResult = await loginUser(userData);

            // Save accessToken to localStorage
            localStorage.setItem("token", loginResult.data.accessToken);
            localStorage.setItem("user", JSON.stringify(loginResult.data));

            loginMessage.textContent = "Login successful!";

            setTimeout(() => {
                window.location.href = "/";
            }, 1000);

        } catch (error) {
            loginMessage.textContent = `Login failed. ${error.message}`;
        }
    });
}

//LOG OUT
function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

const logOutBtn = document.getElementById("logout-btn");

if (logOutBtn) {
    logOutBtn.addEventListener("click", (e) => {
        logoutUser()
        console.log("logga ut");

    })
}