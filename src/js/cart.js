import { groupById, getPath } from "./utils.js"



export let cartArray = JSON.parse(localStorage.getItem("cartList")) || []

function renderCart(container, totalContainer) {
    if (!container || !totalContainer) return

    container.innerHTML = ""
    let total = 0;
    const grouped = groupById(cartArray);

    if (!cartArray || cartArray.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>"
        totalContainer.innerHTML = `<div class="summary-box"><p>Total: 0.00</p>`
        return
    }

    grouped.forEach(item => {
        const itemPrice = item.discountedPrice ?? item.price
        const itemTotal = itemPrice
        total += itemTotal * item.quantity

        container.innerHTML += `
    <div>
        <div class="item-in-cart">
          <div class="cart-image-container">
            <img src="${item.image.url}" alt="${item.image.alt}" />
          </div>
          <div class="item-in-cart-information">
          <div class="cart-product-title-price">
            <h2>${item.title}</h2>
            <p>$${item.discountedPrice ?? item.price}</p>
          </div>
          <div class="qty-btns">
          <button class="remove-btn add-remove-btn btn-secondary" data-id="${item.id}">
            <i class="fa-sharp fa-thin fa-minus"></i>
          </button>
          <p class="item-number">${item.quantity}</p>
          <button class="increase-btn add-remove-btn btn-secondary" data-id="${item.id}">
            <i class="fa-sharp fa-thin fa-plus"></i>
          </button>
          <button class="remove-all-btn add-remove-btn btn-secondary" data-id="${item.id}">
            <i class="fa-sharp fa-thin fa-trash-can"></i>
          </button>
          </div>
        </div>
        </div>
        
      </div>
    `;
    });


    const removeButtons = container.querySelectorAll(".remove-btn")

    removeButtons.forEach(button => {
        const id = button.dataset.id
        removeFromCart(id, button)
    })

    const increaseButtons = container.querySelectorAll(".increase-btn")

    increaseButtons.forEach(button => {
        const id = button.dataset.id
        increaseProductInCart(id, button)
    });

    const removeAllButton = container.querySelectorAll(".remove-all-btn")

    removeAllButton.forEach(button => {
        const id = button.dataset.id
        removeAllProducts(id, button)
    })

    const paymentDetailsCart = container.classList.contains("payment-details-cart")


    if (container.classList.contains("cart-list-page")) {

        totalContainer.innerHTML = `
      <div class="summary-box">
        <p>Total: $${total.toFixed(2)}</p><button class="btn-secondary clear-cart-btn">Clear Cart<i class="fa-sharp fa-thin fa-trash-can"></i></button>
      </div>
      <div class="checkout-continue">
      ${paymentDetailsCart ? '' : `<a href="${getPath("src/pages/checkout.html")}" class="btn-main checkout-btn">Checkout</a><a href="./" class="link">Continue shopping</a>`}
        
      </div>`

        const clearCartButton = totalContainer.querySelector(".clear-cart-btn");

        if (clearCartButton) {
            clearCartButton.addEventListener("click", () => {
                clearCart();
            });
        }

        return;
    }


}

export function updateCart() {
    const pageCart = document.querySelector(".cart-list-page")
    const pageTotal = document.querySelector(".total-page")
    renderCart(pageCart, pageTotal)

}

function removeFromCart(id, button) {
    button.addEventListener("click", () => {
        const item = cartArray.find(product => product.id === id)
        if (item) {
            for (let i = 0; i < cartArray.length; i += 1) {
                if (cartArray[i].id === item.id) {
                    cartArray.splice(i, 1);
                    localStorage.setItem("cartList", JSON.stringify(cartArray))
                    break
                }
            }
            updateCart(cartArray)
        }
    })

}

function increaseProductInCart(id, button) {
    button.addEventListener("click", () => {
        const item = cartArray.find(product => product.id === id)
        if (item) {
            cartArray.push(item)
            localStorage.setItem("cartList", JSON.stringify(cartArray))
            updateCart(cartArray)
        }
    });
}

function removeAllProducts(productId, button) {
    button.addEventListener("click", () => {
        cartArray = cartArray.filter(product => product.id !== productId)
        localStorage.setItem("cartList", JSON.stringify(cartArray))
        updateCart(cartArray)
    })

}

export function clearCart() {
    localStorage.removeItem("cartList");
    cartArray = [];
    updateCart();
}



updateCart(cartArray)




