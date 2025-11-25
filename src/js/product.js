import { getProduct } from "/src/js/api/products.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const productContainer = document.querySelector(".product-container")
const imgContainer = document.querySelector(".product-img")
const ratingContainer = document.querySelector(".ratings-container")
const tagsContainer = document.querySelector(".tags-container")

async function fetchProductDetails() {
    if (!productContainer && !imgContainer && !ratingContainer && !tagsContainer) return

    const data = await getProduct(productId)
    const product = data.data

    imgContainer.innerHTML = `<img src="${product.image.url}" alt="${product.image.alt}">`
    productContainer.innerHTML = `
    <div class="product-container">
          <div class="product-title-price">
            <h1>${product.title}</h1>
            <p>$${product.price}</p>
            <p class="discounted-price">$${product.discountedPrice}</p>
          </div>

          <p>
          ${product.description}
          </p>
            <button>Add to cart</button>
            <i class="fa-sharp fa-thin fa-share"></i>
            <p><i class="fa-sharp fa-thin fa-star"></i> ${product.rating}</p>
        </div>
    `

    product.reviews.forEach(review => {
        ratingContainer.innerHTML += `  
         <div class="customer-review-container">       
        <p>${review.username}</p>
          <p><i class="fa-sharp fa-thin fa-star"></i> ${review.rating}</p>
        <p>${review.description}</p>
        </div>
`
    });

    product.tags.forEach(tag => {
        tagsContainer.innerHTML += ` <div class="tag">${tag}</div>`
    });



}

fetchProductDetails()