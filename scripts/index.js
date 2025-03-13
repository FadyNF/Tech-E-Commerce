document.addEventListener("DOMContentLoaded", function () {
    const hiddenElements = document.querySelectorAll(".hidden");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.1 }
    );

    hiddenElements.forEach((el) => observer.observe(el));

    // Menu toggle functionality
    menuToggle.addEventListener("click", function (event) {
        navLinks.classList.toggle("active");
        event.stopPropagation(); // Prevents immediate closing when clicking the menu button
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (
            navLinks.classList.contains("active") &&
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            navLinks.classList.remove("active");
        }
    });

    // Prevent menu from closing when clicking inside the menu itself
    navLinks.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Initialize carousels
    setupCarousel(
        ".trending",
        ".product-grid",
        ".product",
        ".trending .prev-btn",
        ".trending .next-btn",
        ".trending .indicator"
    );
    setupCarousel(
        ".categories",
        ".category-grid",
        ".category",
        ".categories .prev-btn",
        ".categories .next-btn",
        ".categories .indicator"
    );

    function setupCarousel(
        sectionSelector,
        gridSelector,
        itemSelector,
        prevBtnSelector,
        nextBtnSelector,
        indicatorsSelector
    ) {
        const section = document.querySelector(sectionSelector);
        if (!section) return;

        const grid = section.querySelector(gridSelector);
        const items = section.querySelectorAll(itemSelector);
        const prevBtn = section.querySelector(prevBtnSelector);
        const nextBtn = section.querySelector(nextBtnSelector);
        const indicators = section.querySelectorAll(indicatorsSelector);

        let currentIndex = 0;

        if (!grid || !items.length || !prevBtn || !nextBtn) return;

        prevBtn.addEventListener("click", () => {
            currentIndex = Math.max(0, currentIndex - 1);
            scrollToItem(currentIndex);
            updateIndicators();
        });

        nextBtn.addEventListener("click", () => {
            currentIndex = Math.min(items.length - 1, currentIndex + 1);
            scrollToItem(currentIndex);
            updateIndicators();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
                currentIndex = index;
                scrollToItem(currentIndex);
                updateIndicators();
            });
        });

        function scrollToItem(index) {
            if (items[index]) {
                grid.scrollTo({
                    left: items[index].offsetLeft - grid.offsetLeft,
                    behavior: "smooth",
                });
            }
        }

        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle("active", index === currentIndex);
            });
        }
    }
});
