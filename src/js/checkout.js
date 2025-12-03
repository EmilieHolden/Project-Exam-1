import { validateForm } from "/src/js/utils.js";

const checkoutForm = document.getElementById("checkout-form")

if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault()
        if (!validateForm(checkoutForm)) return;

        window.location.href = "src/pages/success.html";
    })
}
