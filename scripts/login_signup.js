// const wrapper = document.querySelector(".wrapper");
// const registerLink = document.querySelector(".register-link");
// const loginLink = document.querySelector(".login-link");

// // Mobile-friendly toggle function
// function toggleForm(e) {
//   e.preventDefault();
//   wrapper.classList.toggle("active");

//   // Force reflow for animations
//   void wrapper.offsetWidth;
// }

// // Click events (works for both desktop and mobile)
// registerLink.addEventListener('click', toggleForm);
// loginLink.addEventListener('click', toggleForm);

// // Optional: Add touch events for better mobile response
// registerLink.addEventListener('touchend', function(e) {
//   e.preventDefault();
//   this.click(); // Trigger the click event
// });

// loginLink.addEventListener('touchend', function(e) {
//   e.preventDefault();
//   this.click();
// });

// const users = {
//   "admin@example.com": "Admin@123",
//   "user@example.com": "User@123",
// };

// function showError(element, message) {
//   element.textContent = message;
//   element.style.display = "block";

//   setTimeout(() => {
//     element.style.display = "none";
//   }, 3000);
// }

// document.getElementById("loginForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const email = document.getElementById("loginEmail").value.trim();
//   const password = document.getElementById("loginPassword").value.trim();
//   const errorText = document.getElementById("loginError");

//   if (users[email] && users[email] === password) {

//     window.location.href = "/pages/index.html";
//   } else {
//     showError(errorText, "Invalid credentials");
//   }
// });

// document.getElementById("registerForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const email = document.getElementById("registerEmail").value.trim();
//   const password = document.getElementById("registerPassword").value.trim();
//   const errorText = document.getElementById("registerError");

//   if (!validateEmail(email)) {
//     showError(errorText, "Invalid email format");
//   } else {
//     window.location.href = "/pages/index.html";
//   }
// });

// function validateEmail(email) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// }

document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".wrapper");
    const registerLink = document.querySelector(".register-link");
    const loginLink = document.querySelector(".login-link");

  


    // Mobile-friendly toggle function with forced reflow
    // Modify your existing toggleForm function
    function toggleForm(e) {
        e.preventDefault();
        wrapper.classList.toggle("active");

        // Force reflow for animations
        void wrapper.offsetWidth;

        // Apply mobile-specific adjustments
        handleFormTransition();

        // Ensure proper focus after transition
        setTimeout(() => {
            const activeForm = wrapper.classList.contains("active")
                ? document.querySelector(".form-box.register input")
                : document.querySelector(".form-box.login input");
            if (activeForm) activeForm.focus();
        }, 800);
    }

    // Click events for both desktop and mobile
    registerLink.addEventListener("click", toggleForm);
    loginLink.addEventListener("click", toggleForm);

    // Better touch handling for mobile
    registerLink.addEventListener("touchend", function (e) {
        e.preventDefault();
        this.click(); // Trigger the click event
    });

    loginLink.addEventListener("touchend", function (e) {
        e.preventDefault();
        this.click();
    });

    // Sample user data (for demonstration)
    const users = {
        "admin@example.com": "Admin@123",
        "user@example.com": "User@123",
    };

    function showError(element, message) {
        element.textContent = message;
        element.style.display = "block";

        setTimeout(() => {
            element.style.display = "none";
        }, 3000);
    }

    // Login form handler
    document
        .getElementById("loginForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim();
            const password = document
                .getElementById("loginPassword")
                .value.trim();
            const errorText = document.getElementById("loginError");

            if (users[email] && users[email] === password) {
                window.location.href = "/pages/index.html";
            } else {
                showError(errorText, "Invalid credentials");
            }
        });

    // Register form handler
    document
        .getElementById("registerForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("registerEmail").value.trim();
            const password = document
                .getElementById("registerPassword")
                .value.trim();
            const errorText = document.getElementById("registerError");

            if (!validateEmail(email)) {
                showError(errorText, "Invalid email format");
            } else {
                window.location.href = "/pages/index.html";
            }
        });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Optional: Add resize handler to ensure animations reset properly
    window.addEventListener("resize", function () {
        if (window.innerWidth <= 768) {
            // Adjust for better mobile performance if needed
        }
    });
});


