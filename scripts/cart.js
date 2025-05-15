document.addEventListener("DOMContentLoaded", function () {
  // Load cart items from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const cartSummary = document.getElementById("cart-summary");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");
  const shippingElement = document.getElementById("shipping");

  // Calculate and update cart totals
  function updateCartTotals() {
    let subtotal = 0;
    const shipping = 50;

    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    const total = subtotal + shipping;

    subtotalElement.textContent = `${subtotal} EGP`;
    shippingElement.textContent = `${shipping} EGP`;
    totalElement.textContent = `${total} EGP`;

    if (cart.length === 0) {
      emptyCartMessage.style.display = "block";
      cartSummary.style.display = "none";
    } else {
      emptyCartMessage.style.display = "none";
      cartSummary.style.display = "block";
    }
  }

  // Update a single cart item's display
  function updateCartItem(index) {
    const item = cart[index];
    const cartItemElement = cartItemsContainer.children[index];

    if (!item) {
      cartItemElement.remove();
      return;
    }

    const itemTotalPrice = item.price * item.quantity;
    cartItemElement.querySelector(".quantity").textContent = item.quantity;
    cartItemElement.querySelector(
      ".item-price"
    ).textContent = `${itemTotalPrice} EGP`;
  }

  // Display all cart items
  function displayCartItems() {
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";

      const itemTotalPrice = item.price * item.quantity;

      cartItemElement.innerHTML = `
        <div class="item-info">
          <img class="item-img" src="${item.image}" alt="${item.name}" onerror="this.src='/media/default-product.png'">
          <div class="item-details">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        </div>
        <div class="item-quantity">
          <button class="quantity-btn minus" data-index="${index}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn plus" data-index="${index}">+</button>
        </div>
        <div class="item-price">${itemTotalPrice} EGP</div>
        <button class="remove-item" data-index="${index}"><i class="fas fa-trash"></i></button>
      `;

      cartItemsContainer.appendChild(cartItemElement);
    });

    updateCartTotals();
  }

  // Initialize cart display
  displayCartItems();

  // Handle cart operations
  function handleCartOperation(index, operation) {
    switch (operation) {
      case "increment":
        cart[index].quantity++;
        updateCartItem(index);
        break;
      case "decrement":
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
          updateCartItem(index);
        } else {
          cart.splice(index, 1);
          displayCartItems();
        }
        break;
      case "remove":
        cart.splice(index, 1);
        displayCartItems();
        break;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartTotals();
  }

  // Event delegation for quantity buttons and remove item
  cartItemsContainer.addEventListener("click", function (e) {
    const target =
      e.target.closest(".quantity-btn") || e.target.closest(".remove-item");
    if (!target) return;

    const index = parseInt(target.dataset.index);

    if (target.classList.contains("plus")) {
      handleCartOperation(index, "increment");
    } else if (target.classList.contains("minus")) {
      handleCartOperation(index, "decrement");
    } else if (target.classList.contains("remove-item")) {
      handleCartOperation(index, "remove");
    }
  });
});
