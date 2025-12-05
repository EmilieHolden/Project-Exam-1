import { validateForm } from "./utils.js";
import { loginUser } from "./api/login.js";

const loginMainContainer = document.getElementById("login-main-container");

function renderLoggedOutView() {
    loginMainContainer.innerHTML = `
        <h1>Login</h1>
        <form id="login-form" novalidate>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
            <label for="password">Password</label>
            <input type="password" id="password" name="password" minlength="8" required />
            <button class="btn-main" type="submit" id="login-btn">Login</button>
        </form>
        <p id="login-message"></p>
        <a class="link" href="./register.html">Register account</a>
    `;

    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            if (!validateForm(loginForm)) return;

            const userData = {
                email: document.getElementById("email").value.trim(),
                password: document.getElementById("password").value,
            };

            let loading = false

            try {
                loading = true
                loginMessage.textContent = "Logging in..."

                const loginResult = await loginUser(userData);
                localStorage.setItem("token", loginResult.data.accessToken);
                localStorage.setItem("user", JSON.stringify(loginResult.data));

                loginMessage.textContent = "Login successful!";

                setTimeout(() => {
                    renderLoggedInView();
                    window.location.href = "../../index.html";
                }, 1000);
            } catch (error) {
                loginMessage.textContent = `Login failed. ${error.message}`;
                loginMessage.classList.add("error-text")
            }
        });
    }
}

function renderLoggedInView() {
    loginMainContainer.innerHTML = `
        <h1>You are logged in</h1>
        <button class="btn-main" id="logout-btn">Log out</button>
    `;

    const logOutBtn = document.getElementById("logout-btn");

    if (logOutBtn) {
        logOutBtn.addEventListener("click", () => {
            logoutUser();
            renderLoggedOutView();
        });
    }
}

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

if (loginMainContainer) {
    const userToken = localStorage.getItem("token");
    if (userToken) {
        renderLoggedInView();
    } else {
        renderLoggedOutView();
    }
}
