import { getProducts } from "./api/products.js";
import { getPath } from "./utils.js";
import "./register.js";
import "./login.js";
import "./product.js";
import "./product-carousel.js"
import "./checkout.js"



export async function fetchAndCreateProducts() {
    const container = document.querySelector("#container")
    if (!container) return

    let loading = false


    try {
        loading = true
        container.innerHTML = "<p>Loading...</p>";

        const data = await getProducts();
        let products = data.data

        container.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement("a")
            const imageContainer = document.createElement("div")
            const image = document.createElement("img")
            const content = document.createElement("div")
            const title = document.createElement("h2")
            const viewProductButton = document.createElement("button")

            card.className = 'card'
            imageContainer.className = 'product-image-container'
            image.className = 'card-image'
            content.className = 'card-content'
            title.className = 'card-title'
            viewProductButton.className = 'btn-secondary'

            card.href = getPath(`product.html?id=${product.id}`);
            image.src = product.image.url
            image.alt = product.image.alt
            title.textContent = product.title
            viewProductButton.textContent = "View product";
            viewProductButton.setAttribute("data-product", product.id)


            content.appendChild(title)
            card.appendChild(imageContainer)
            imageContainer.appendChild(image)
            card.appendChild(content)
            content.appendChild(viewProductButton)
            container.appendChild(card)

        })
    } catch (error) {
        console.error("Failed to fetch and create products", error)
        container.textContent = 'Failed to load products'
    } finally {
        loading = false
    }
}

fetchAndCreateProducts();
