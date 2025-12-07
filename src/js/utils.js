export function groupById(cartArray) {
    const grouped = new Map();

    cartArray.forEach(item => {

        if (grouped.has(item.id)) {
            grouped.get(item.id).quantity += 1
        } else {
            grouped.set(item.id, {
                ...item,
                quantity: 1
            })
        }
    })

    return grouped;
}

export function updateCartCount() {
    const counter = document.querySelector(".cart-count");
    if (!counter) return;

    const cart = JSON.parse(localStorage.getItem("cartList")) || [];
    const count = cart.length;

    counter.textContent = count;
    counter.hidden = count === 0;
}


export function validateForm(form) {
    let valid = true;

    // Remove old errors
    form.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));
    form.querySelectorAll(".error-text").forEach(el => el.remove());

    // Validate each field
    form.querySelectorAll("input, textarea, select").forEach(input => {
        if (!input.checkValidity()) {
            valid = false;
            input.classList.add("input-error");

            const errorMessage = document.createElement("p");
            errorMessage.classList.add("error-text");
            errorMessage.textContent = input.validationMessage;
            input.insertAdjacentElement("beforebegin", errorMessage);
        }
    });

    return valid;
}
