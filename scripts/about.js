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

    const statNumbers = document.querySelectorAll(".stat-number");

    const animateCount = (element, target) => {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);

        const updateCount = () => {
            const current = parseFloat(element.textContent);
            if (current < target) {
                element.textContent = Math.ceil(current + increment);
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
            }
        };

        updateCount();
    };

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const target = parseInt(
                        statNumber.getAttribute("data-count")
                    );
                    animateCount(statNumber, target);
                    observer.unobserve(statNumber);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach((stat) => {
        observer.observe(stat);
    });

    // Team member hover effect enhancement
    const teamMembers = document.querySelectorAll(".team-member");

    teamMembers.forEach((member) => {
        member.addEventListener("mouseenter", () => {
            const photo = member.querySelector(".member-photo");
            photo.style.transform = "scale(1.1)";
            photo.style.boxShadow = "0 10px 25px rgba(109, 178, 230, 0.3)";
        });

        member.addEventListener("mouseleave", () => {
            const photo = member.querySelector(".member-photo");
            photo.style.transform = "scale(1)";
            photo.style.boxShadow = "none";
        });
    });
});
