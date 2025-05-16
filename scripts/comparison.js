document.addEventListener("DOMContentLoaded", function () {
    const burgerMenu = document.querySelector(".burger-menu");
    const navLinks = document.querySelector(".nav-links");

    burgerMenu.addEventListener("click", function () {
        // Toggle active class on both burger and nav links
        burgerMenu.classList.toggle("active");
        navLinks.classList.toggle("active");

        // Prevent scrolling when menu is open
        if (navLinks.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    // Close menu when clicking on links (for mobile)
    const navLinksItems = document.querySelectorAll(".nav-links a");
    navLinksItems.forEach((link) => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 1024) {
                burgerMenu.classList.remove("active");
                navLinks.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    });

    const compareBtn = document.getElementById("compareBtn");
    const resultOverlay = document.getElementById("resultOverlay");
    const closeBtn = document.querySelector(".close-btn");
    const item1Select = document.getElementById("item1");
    const item2Select = document.getElementById("item2");
    const product1Card = document.getElementById("product1");
    const product2Card = document.getElementById("product2");

    // Product data
    const products = {
        iphone13: {
            name: "iPhone 13",
            price: "EGP 35,000",
            description:
                "The iPhone 13 features a stunning Super Retina XDR display, A15 Bionic chip, and advanced dual-camera system with Night mode.",
            specs: [
                "6.1-inch Super Retina XDR display",
                "A15 Bionic chip with 4-core GPU",
                "Dual 12MP camera system",
                "Up to 19 hours video playback",
                "iOS 15 with new features",
            ],
        },
        samsung22: {
            name: "Samsung Galaxy S22",
            price: "EGP 32,000",
            description:
                "The Galaxy S22 offers a Dynamic AMOLED 2X display, Snapdragon 8 Gen 1 processor, and pro-grade camera system with Nightography.",
            specs: [
                "6.1-inch Dynamic AMOLED 2X",
                "Snapdragon 8 Gen 1",
                "Triple camera system (50MP main)",
                "3700mAh battery",
                "Android 12 with One UI 4.1",
            ],
        },
        pixel6: {
            name: "Google Pixel 6",
            price: "EGP 25,000",
            description:
                "Pixel 6 comes with Google's Tensor chip, an advanced camera system with Magic Eraser, and the best of Google built in.",
            specs: [
                "6.4-inch FHD+ OLED display",
                "Google Tensor chip",
                "50MP main + 12MP ultra-wide",
                "4614mAh battery",
                "Android 12 with Pixel features",
            ],
        },
        oneplus10: {
            name: "OnePlus 10 Pro",
            price: "EGP 28,000",
            description:
                "OnePlus 10 Pro features Hasselblad Camera for Mobile, Snapdragon 8 Gen 1, and 80W SuperVOOC fast charging.",
            specs: [
                "6.7-inch QHD+ AMOLED",
                "Snapdragon 8 Gen 1",
                "Hasselblad triple camera",
                "5000mAh battery",
                "80W SuperVOOC charging",
            ],
        },
    };

    // Function to check if both items are selected
    function checkSelections() {
        const item1Selected = item1Select.value !== "";
        const item2Selected = item2Select.value !== "";

        if (item1Selected && item2Selected) {
            compareBtn.disabled = false;
            compareBtn.style.cursor = "pointer";
            compareBtn.title = "";
        } else {
            compareBtn.disabled = true;
            compareBtn.style.cursor = "not-allowed";
            compareBtn.title = "Please select both products to compare";
        }
    }

    // Initial check
    checkSelections();
    item1Select.addEventListener("change", function () {
        if (item1Select.value === item2Select.value) {
            item2Select.value = "";
        }
        checkSelections();
    });

    item2Select.addEventListener("change", function () {
        if (item2Select.value === item1Select.value) {
            item1Select.value = "";
        }
        checkSelections();
    });

    // Compare button click handler
    compareBtn.addEventListener("click", function () {
        const item1Value = item1Select.value;
        const item2Value = item2Select.value;
        compareBtn.classList.add("clicked");
        setTimeout(() => {
            compareBtn.classList.remove("clicked");

            populateProductCard(product1Card, products[item1Value]);
            populateProductCard(product2Card, products[item2Value]);

            resultOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }, 500);
    });

    closeBtn.addEventListener("click", function () {
        resultOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    resultOverlay.addEventListener("click", function (e) {
        if (e.target === resultOverlay) {
            resultOverlay.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });

    // Enhanced product card population
    function populateProductCard(card, product) {
        const specsHtml = product.specs
            .map(
                (spec) => `<li><i class="fas fa-check-circle"></i> ${spec}</li>`
            )
            .join("");

        card.innerHTML = `
            <div class="product-header">
                <h3>${product.name}</h3>
            </div>
            <div class="price">${product.price}</div>
            <div class="description">${product.description}</div>
            <div class="specs">
                <h4>Key Features:</h4>
                <ul>${specsHtml}</ul>
            </div>
            <div class="product-glow"></div>
        `;
    }
});
