document.addEventListener("DOMContentLoaded", function() {
    const burgerMenu = document.querySelector(".burger-menu");
    const navLinks = document.querySelector(".nav-links");
    
    burgerMenu.addEventListener("click", function() {
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
    navLinksItems.forEach(link => {
        link.addEventListener("click", function() {
            if (window.innerWidth <= 1024) {
                burgerMenu.classList.remove("active");
                navLinks.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    });
});