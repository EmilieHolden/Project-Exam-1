import { registerUser } from "./api/register.js";
import { loginUser } from "./api/login.js";
import { validateForm } from "./utils.js";

// REGISTER
const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!validateForm(registerForm)) return;

        const userData = {
            name: document.getElementById("fname").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value,
        };

        let loading = false

        try {
            loading = true
            registerMessage.textContent = `Registrating account...`
            registerMessage.classList.remove("error-text", "success-text")

            await registerUser(userData);
            const loginResult = await loginUser({
                email: userData.email,
                password: userData.password,
            });

            localStorage.setItem("token", loginResult.data.accessToken);
            localStorage.setItem("user", JSON.stringify(loginResult.data));

            registerMessage.textContent = "Registration successful, you are now logged in to your new account";
            registerMessage.classList.add("success-text");

            setTimeout(() => {
                window.location.href = "../../index.html";
            }, 1000);
        } catch (error) {
            registerMessage.textContent = `Registration failed. ${error.message}`;
            registerMessage.classList.add("error-text")
        }
    });
}
