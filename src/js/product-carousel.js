import { getProducts } from "./api/products.js";

/*
Inspired and adapted from existing code, with adjustments to fit my project.
 * Title: Accessible infinite loop carousel
 * Author: Masakudamatsu
 * Date: 12.05.2025
 * URL: https://codepen.io/masakudamatsu/pen/oNRzKze
 */

async function initCarousel() {
    const carouselContent = document.querySelector(".carousel__content");
    if (!carouselContent) return;

    let loading = false

    try {
        loading = true

        carouselContent.innerHTML = `
        <div class="carousel__status carousel__item">Loading...</div>
    `;

        const data = await getProducts();
        const products = data.data;

        carouselContent.innerHTML = "";
        renderCarousel(products);
    } catch (error) {
        carouselContent.innerHTML = `
        <div class="carousel__status carousel__item error-text">
            Failed to load products.
        </div>
    `;
    } finally {
        loading = false
    }
}

function renderCarousel(products) {
    const carouselContent = document.querySelector(".carousel__content");
    const btnLeft = document.querySelector(".carousel__btn--left");
    const btnRight = document.querySelector(".carousel__btn--right");

    if (!carouselContent) return;

    // Take the 3 latest products

    const latestProducts = products.slice(0, 3);
    latestProducts.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("carousel__item");

        div.innerHTML = `
      <div class="carousel-product-image-container"><img src="${product.image.url}" alt="${product.image.alt}"></div>
      <h2>${product.title}</h3>
      <button class="btn-secondary view-product-btn" data-id="${product.id}">View product</button>
    `;

        carouselContent.appendChild(div);
    });

    const itemsArray = [...carouselContent.children];
    const firstClone = itemsArray[0].cloneNode(true);
    const lastClone = itemsArray[itemsArray.length - 1].cloneNode(true);

    firstClone.classList.add("clone");
    lastClone.classList.add("clone");

    carouselContent.appendChild(firstClone);
    carouselContent.insertBefore(lastClone, carouselContent.firstChild);

    // Basic carousel functionality
    const allItems = document.querySelectorAll(".carousel__item");
    const total = allItems.length;

    let index = 1;
    carouselContent.style.transform = `translateX(-${index * 100}%)`;

    function showSlide(i) {
        carouselContent.style.transition = "transform 0.5s ease-in-out";
        carouselContent.style.transform = `translateX(-${i * 100}%)`;
    }

    carouselContent.addEventListener("transitionend", () => {
        if (allItems[index].classList.contains("clone")) {
            carouselContent.style.transition = "none"; // snap without animation
            if (index === 0) {
                index = total - 2; // last real slide
            } else if (index === total - 1) {
                index = 1; // first real slide
            }
            carouselContent.style.transform = `translateX(-${index * 100}%)`;
        }
    });

    btnLeft.addEventListener("click", () => {
        index = (index - 1 + total) % total;
        showSlide(index);
    });

    btnRight.addEventListener("click", () => {
        index = (index + 1) % total;
        showSlide(index);
    });

    const viewButtons = document.querySelectorAll(".view-product-btn");

    viewButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            window.location.href = `src/pages/product.html?id=${id}`;
        });
    });

    showSlide(1);
}

initCarousel();
