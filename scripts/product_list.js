document.addEventListener("DOMContentLoaded", function () {
  const wishlistButtons = document.querySelectorAll(".favorite-btn");
  const cartButtons = document.querySelectorAll(".cart-btn");

  const wishlistNotification = document.getElementById("wishlist-notification");
  const cartNotification = document.getElementById("cart-notification");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Sync heart filling on page load
  wishlistButtons.forEach((button) => {
    const card = button.closest(".flip-card");
    const name = card.querySelector("h3").innerText;

    if (wishlist.find((item) => item.name === name)) {
      button.classList.add("added");
      const icon = button.querySelector("i");
      icon.className = "fa-solid fa-heart";
    }
  });

  // Sync cart buttons on page load
  cartButtons.forEach((button) => {
    const card = button.closest(".flip-card");
    const name = card.querySelector("h3").innerText;

    if (cart.find((item) => item.name === name)) {
      button.classList.add("added");
      const icon = button.querySelector("i");
      icon.className = "fa-solid fa-minus";
    }
  });

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = button.closest(".flip-card");
      const name = card.querySelector("h3").innerText;
      const price = card.querySelector(".price").innerText;
      const img = card.querySelector("img").getAttribute("src");
      const icon = button.querySelector("i");

      const product = { name, price, img };

      const existsIndex = wishlist.findIndex((item) => item.name === name);

      if (existsIndex !== -1) {
        // Remove from wishlist
        wishlist.splice(existsIndex, 1);
        icon.className = "fa-regular fa-heart";
        button.classList.remove("added");
        showNotification(wishlistNotification, "Removed from Wishlist", true);
      } else {
        // Add to wishlist
        wishlist.push(product);
        icon.className = "fa-solid fa-heart";
        button.classList.add("added");
        showNotification(wishlistNotification, "Added to Wishlist", false);
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });
  });

  cartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = button.closest(".flip-card");
      const name = card.querySelector("h3").innerText;
      const priceText = card.querySelector(".price").innerText;
      const price = parseInt(priceText.replace(/\D/g, ""));
      const imgElement = card.querySelector(".flip-card-front img");
      const imgPath = imgElement.src;
      const description = card.querySelector(".flip-card-back p").innerText;
      const icon = button.querySelector("i");

      // Create proper image URL
      const baseUrl = window.location.origin;
      let imageUrl = imgPath.startsWith("http") ? imgPath : baseUrl + imgPath;

      const product = {
        name,
        price,
        image: imageUrl,
        description,
        quantity: 1,
      };

      const existsIndex = cart.findIndex((item) => item.name === name);

      if (existsIndex !== -1) {
        // Remove from cart
        cart.splice(existsIndex, 1);
        icon.className = "fa-solid fa-plus";
        button.classList.remove("added");
        showNotification(cartNotification, "Removed from Cart", true);
      } else {
        // Add to cart
        cart.push(product);
        icon.className = "fa-solid fa-minus";
        button.classList.add("added");
        showNotification(cartNotification, "Added to Cart", false);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });

  function showNotification(notification, message, isRemoved = false) {
    notification.textContent = message;
    notification.classList.toggle("removed", isRemoved);
    notification.classList.add("show");

    // Set color based on action
    if (isRemoved) {
      notification.style.backgroundColor = "#f44336";
    } else {
      notification.style.backgroundColor = "#4caf50";
    }

    setTimeout(() => {
      notification.classList.remove("show");
    }, 1500);
  }
});
