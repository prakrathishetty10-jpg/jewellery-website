// === CART FUNCTIONS ===

// Get items from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save items to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update the cart count in the header
function updateCartCount() {
  const cart = getCart();
  const countElement = document.querySelector(".cart_quantity");
  if (countElement) countElement.textContent = cart.length;
}

// Add product when "Add to Cart" is clicked
function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: btn.dataset.price,
        image: btn.dataset.image,
      };

      let cart = getCart();
      const exists = cart.find((item) => item.id === product.id);

      if (!exists) {
        cart.push(product);
        saveCart(cart);
        updateCartCount();
        alert(product.name + " added to cart!");
      } else {
        alert(product.name + " is already in your cart.");
      }
    });
  });
}

// Show items in the cart page
function displayCart() {
  const container = document.getElementById("cart-container");
  if (!container) return; // not on cart page

  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item, index) => {
    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" width="80">
        <div>
          <h4>${item.name}</h4>
          <p>Rs. ${item.price}</p>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      </div>
    `;
  });

  // Remove button event
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      let cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
      displayCart();
      updateCartCount();
    });
  });
}

// Run functions
document.addEventListener("DOMContentLoaded", () => {
  setupAddToCartButtons();
  displayCart();
  updateCartCount();
});
