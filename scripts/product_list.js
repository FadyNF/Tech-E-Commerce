document.addEventListener("DOMContentLoaded", function () {
    const wishlistButtons = document.querySelectorAll(".favorite-btn");
    const cartButtons = document.querySelectorAll(".cart-btn");

    const wishlistNotification = document.getElementById(
        "wishlist-notification"
    );
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

            const existsIndex = wishlist.findIndex(
                (item) => item.name === name
            );

            if (existsIndex !== -1) {
                // Remove from wishlist
                wishlist.splice(existsIndex, 1);
                icon.className = "fa-regular fa-heart";
                button.classList.remove("added");
                showNotification(
                    wishlistNotification,
                    "Removed from Wishlist",
                    true
                );
            } else {
                // Add to wishlist
                wishlist.push(product);
                icon.className = "fa-solid fa-heart";
                button.classList.add("added");
                showNotification(
                    wishlistNotification,
                    "Added to Wishlist",
                    false
                );
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
            const description =
                card.querySelector(".flip-card-back p").innerText;
            const icon = button.querySelector("i");

            // Create proper image URL
            const baseUrl = window.location.origin;
            let imageUrl = imgPath.startsWith("http")
                ? imgPath
                : baseUrl + imgPath;

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

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const resultsCount = document.getElementById("results-count");
    const productCards = document.querySelectorAll(".flip-card");
    const container = document.querySelector(".container");

    // Function to perform search
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        let matchCount = 0;
        let noResultsElement = document.querySelector(".no-results");

        // Remove existing "no results" message if it exists
        if (noResultsElement) {
            container.removeChild(noResultsElement);
        }

        // If search is empty, show all products
        if (query === "") {
            productCards.forEach((card) => {
                card.classList.remove("hidden");
                // Add a slight delay for a fade-in effect
                setTimeout(() => {
                    card.classList.add("fade-in");
                }, 50);
            });
            resultsCount.textContent = "";
            return;
        }

        // Filter products
        productCards.forEach((card) => {
            const productName = card
                .querySelector("h3")
                .textContent.toLowerCase();
            const productDesc = card
                .querySelector(".flip-card-back p")
                .textContent.toLowerCase();
            const productPrice = card
                .querySelector(".price")
                .textContent.toLowerCase();

            // Clear previous animation class
            card.classList.remove("fade-in");

            // Check if product matches search query
            if (
                productName.includes(query) ||
                productDesc.includes(query) ||
                productPrice.includes(query)
            ) {
                card.classList.remove("hidden");
                setTimeout(() => {
                    card.classList.add("fade-in");
                }, 50 * matchCount); // Stagger the animations
                matchCount++;
            } else {
                card.classList.add("hidden");
            }
        });

        // Update results count
        if (matchCount === 1) {
            resultsCount.textContent = "Found 1 product";
        } else {
            resultsCount.textContent = `Found ${matchCount} products`;
        }

        // Show "no results" message if no products match
        if (matchCount === 0) {
            const noResults = document.createElement("div");
            noResults.className = "no-results";
            noResults.innerHTML = `
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 15px; opacity: 0.7;"></i>
                <p>No products found matching "${query}"</p>
                <button id="clear-search" class="clear-search">Clear search</button>
            `;
            container.appendChild(noResults);

            // Add event listener to the clear search button
            document
                .getElementById("clear-search")
                .addEventListener("click", function () {
                    searchInput.value = "";
                    performSearch();
                });
        }
    }

    // Event listeners
    searchButton.addEventListener("click", performSearch);

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    // Real-time search as user types (with debounce)
    let debounceTimer;
    searchInput.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(performSearch, 300);
    });

    // Add clear button functionality within the search input
    searchInput.addEventListener("keyup", function () {
        if (this.value.length > 0) {
            searchButton.innerHTML = '<i class="fas fa-times"></i>';
            searchButton.addEventListener(
                "click",
                function clearSearch() {
                    searchInput.value = "";
                    performSearch();
                    searchButton.innerHTML = '<i class="fas fa-search"></i>';
                    searchButton.removeEventListener("click", clearSearch);
                    searchButton.addEventListener("click", performSearch);
                },
                { once: true }
            );
        } else {
            searchButton.innerHTML = '<i class="fas fa-search"></i>';
        }
    });

    // Additional styles for the clear search button
    const style = document.createElement("style");
    style.textContent = `
        .clear-search {
            background: rgba(109, 178, 230, 0.15);
            color: var(--off-white);
            border: 1px solid rgba(109, 178, 230, 0.3);
            padding: 8px 16px;
            border-radius: 20px;
            margin-top: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .clear-search:hover {
            background: rgba(109, 178, 230, 0.3);
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
});
