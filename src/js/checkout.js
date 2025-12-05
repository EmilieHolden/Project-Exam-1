import { validateForm } from "./utils.js";

const checkoutForm = document.getElementById("checkout-form")

if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault()
        if (!validateForm(checkoutForm)) return;

        window.location.href = "./success.html";
    })
}
