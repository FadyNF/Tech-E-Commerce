document.addEventListener("DOMContentLoaded", function () {
    const wishlistButtons = document.querySelectorAll(".favorite-btn");
    const cartButtons = document.querySelectorAll(".cart-btn");

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Toggle menu functionality
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }

    // Close menu when clicking anywhere else
    document.addEventListener("click", function (event) {
        if (
            navLinks &&
            navLinks.classList.contains("active") &&
            !event.target.closest(".nav-links") &&
            !event.target.closest(".menu-toggle")
        ) {
            navLinks.classList.remove("active");
        }
    });

    const wishlistNotification = document.getElementById(
        "wishlist-notification"
    );
    const cartNotification = document.getElementById("cart-notification");

    function showNotification(notification, message, isRemove = false) {
        notification.textContent = message;
        notification.classList.toggle("removed", isRemove);
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 1500);
    }

    wishlistButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const icon = button.querySelector("i");
            if (button.classList.contains("added")) {
                icon.className = "fa-regular fa-heart";
                showNotification(
                    wishlistNotification,
                    "Removed from Wishlist",
                    true
                );
            } else {
                icon.className = "fa-solid fa-heart";
                showNotification(wishlistNotification, "Added to Wishlist");
            }
            button.classList.toggle("added");
        });
    });

    cartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const icon = button.querySelector("i");
            if (button.classList.contains("added")) {
                icon.className = "fa-solid fa-plus";
                showNotification(cartNotification, "Removed from Cart", true);
            } else {
                icon.className = "fa-solid fa-minus";
                showNotification(cartNotification, "Added to Cart");
            }
            button.classList.toggle("added");
        });
    });
});
