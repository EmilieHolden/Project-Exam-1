import { getProduct } from "./api/products.js";
import { cartArray, updateCart } from "./cart.js";

const params = new URLSearchParams(window.location.search);
const shareLink = window.location.href
const productId = params.get("id");
const productMainContainer = document.querySelector(".product-details-page")
const userToken = localStorage.getItem("token");

async function fetchProductDetails() {
  if (!productMainContainer) return

  let loading = false

  try {
    loading = true
    productMainContainer.innerHTML = `
    <span>Loading...</span>
    `

    const data = await getProduct(productId)
    const product = data.data

    productMainContainer.innerHTML = ""
    renderProduct(product)
  } catch (error) {
    productMainContainer.innerHTML = `
    <span class="error-text">Failed to load product.</span>
    `
  }
}

function renderProduct(product) {
  const isOnSale = product.price !== product.discountedPrice

  productMainContainer.innerHTML = `
        <div class="product-img"><img src="${product.image.url}" alt="${product.image.alt}"></div>
        <div class="details-container">
          <div class="product-container">
          <div class="product-container">
          <div class="product-title-price">
            <h1>${product.title}</h1>
            <p>$${product.price}</p>
            
            ${isOnSale ? `<p class="discounted-price">On sale $${product.discountedPrice}</p>` : ""}
          </div>

          <p>
          ${product.description}
          </p>
          <div class="product-actions-container">
            <button class="btn-main" id="add-to-cart-btn">Add to cart</button>
             <button class="btn-secondary" id="share-btn"><i class="fa-sharp fa-thin fa-share"></i></button>
            </div>
            <p><i class="fa-sharp fa-thin fa-star"></i> ${product.rating}</p>
        </div>
          </div>
          <div class="reviews-container">
            <h2>Reviews</h2>
            <div class="ratings-container"></div>
          </div>
          <div class="tags-container"></div>
        </div>
  `

  const ratingContainer = document.querySelector(".ratings-container")
  const tagsContainer = document.querySelector(".tags-container")

  product.reviews.forEach(review => {
    ratingContainer.innerHTML += `  
         <div class="customer-review-container">       
        <p>${review.username}</p> 
        <p>${review.description}</p>
        <p><i class="fa-sharp fa-thin fa-star"></i> ${review.rating}</p>
        </div>
`
  });

  product.tags.forEach(tag => {
    tagsContainer.innerHTML += ` <div class="tag">${tag}</div>`
  });

  const addToCartButton = document.getElementById("add-to-cart-btn");

  // Disable add to cart button if user is not logged in
  if (!userToken) {
    addToCartButton.disabled = true;
    addToCartButton.textContent = "Login to add to cart";
  } else {
    addToCart(addToCartButton, product);
  }

  const shareBtn = document.getElementById("share-btn");
  shareBtn.addEventListener("click", () => copyShareLink(shareLink));
}

fetchProductDetails()

export function addToCart(addToCartButton, product) {
  addToCartButton.addEventListener("click", (event) => {
    event.preventDefault();

    cartArray.push(product);
    updateCart();
    localStorage.setItem("cartList", JSON.stringify(cartArray));

    const originalText = addToCartButton.textContent
    addToCartButton.textContent = "Added to cart"
    addToCartButton.classList.add("add-to-cart-btn-added")
    addToCartButton.disabled = true

    setTimeout(() => {
      addToCartButton.textContent = originalText
      addToCartButton.classList.remove("add-to-cart-btn-added")
      addToCartButton.disabled = false
    }, 2000)
  })
}

updateCart(cartArray);



async function copyShareLink(text) {
  try {
    await navigator.clipboard.writeText(text);
    const shareBtn = document.getElementById("share-btn");
    const originalHTML = shareBtn.innerHTML;

    shareBtn.innerHTML = "Copied!";
    shareBtn.disabled = true;

    setTimeout(() => {
      shareBtn.innerHTML = originalHTML;
      shareBtn.disabled = false;
    }, 1500);

  } catch (error) {
    console.error(error.message);
  }
}

