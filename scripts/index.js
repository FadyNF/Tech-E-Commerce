document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".hidden");

    function fadeInOnScroll() {
        elements.forEach((element) => {
            const position = element.getBoundingClientRect().top;
            if (position < window.innerHeight * 0.9) {
                element.classList.add("show");
            } else {
                element.classList.remove("show");
            }
        });
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll(); // Run once on load
});
