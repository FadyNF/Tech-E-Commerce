// Function to get initials from a full name
function getInitials(fullName) {
    return fullName
        .split(" ") // Split the name into parts
        .map((part) => part[0]) // Get the first letter of each part
        .join("") // Join the letters together
        .toUpperCase(); // Convert to uppercase
}

// Function to update the avatar initials
function updateAvatarInitials() {
    const fullNameElement = document.querySelector(".info p strong"); // Get the full name element
    if (fullNameElement) {
        const fullName = fullNameElement.nextSibling.textContent.trim(); // Extract the full name
        const initials = getInitials(fullName); // Get initials
        const avatar = document.querySelector(".avatar"); // Get the avatar element

        // Update the avatar's content using inline styles
        avatar.style.position = "relative"; // Ensure the avatar is positioned correctly
        avatar.innerHTML = `<span style="font-size: 32px; font-weight: bold; color: var(--cream-white);">${initials}</span>`;
    }
}

// Call the function to update the avatar initials when the page loads
updateAvatarInitials();

// Toggle password visibility
document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", function (e) {
        e.preventDefault();
        const input = this.previousElementSibling;
        const type =
            input.getAttribute("type") === "password" ? "text" : "password";
        input.setAttribute("type", type);
        this.querySelector("svg").classList.toggle("fa-eye");
        this.querySelector("svg").classList.toggle("fa-eye-slash");
    });
});

// Enable/Disable Delete Account button based on checkbox
const deleteConfirmCheckbox = document.getElementById("delete-confirm");
const deleteAccountButton = document.querySelector(".btn-delete-account");
const deletePasswordInput = document.getElementById("delete-password");

deleteConfirmCheckbox.addEventListener("change", function () {
    deleteAccountButton.disabled =
        !this.checked || deletePasswordInput.value.trim() === "";
});

deletePasswordInput.addEventListener("input", function () {
    deleteAccountButton.disabled =
        !deleteConfirmCheckbox.checked || this.value.trim() === "";
});

// Handle Edit and Save buttons for Personal Info
const personalInfoEditButton = document.querySelector(
    ".info:nth-child(1) .btn-edit"
);
const personalInfoFields = document.querySelectorAll(".info:nth-child(1) p");
const personalInfoSaveButton = document.querySelector(
    ".info:nth-child(1) .btn-save"
);

personalInfoEditButton.addEventListener("click", function () {
    // Hide the Edit button and show the Save button
    personalInfoEditButton.style.display = "none";
    personalInfoSaveButton.style.display = "inline-block";

    // Make personal info fields editable
    personalInfoFields.forEach((field) => {
        if (field.textContent.includes(":")) {
            const key = field.textContent.split(":")[0].trim();
            const value = field.textContent.split(":")[1].trim();
            field.innerHTML = `<strong>${key}:</strong> <input type="text" value="${value}" />`;
        }
    });
});

personalInfoSaveButton.addEventListener("click", function () {
    // Save personal info changes
    personalInfoFields.forEach((field) => {
        const input = field.querySelector("input");
        if (input) {
            const key = field
                .querySelector("strong")
                .textContent.replace(":", "");
            const value = input.value;
            field.innerHTML = `<strong>${key}:</strong> ${value}`;
        }
    });

    // Hide the Save button and show the Edit button
    personalInfoSaveButton.style.display = "none";
    personalInfoEditButton.style.display = "inline-block";

    // Update the avatar initials after saving
    updateAvatarInitials();
});

// Handle Delete Account button
deleteAccountButton.addEventListener("click", function () {
    window.location.href = "../pages/index.html"; // Redirect to the homepage after deletion
});

// Menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

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

    // Get modal elements
    const userModal = document.getElementById("userModal");
    const productModal = document.getElementById("productModal");

    // Get buttons to open modals
    const addUserButton = document.querySelector(".btn-add-user");
    const addProductButton = document.querySelector(".btn-add-product");

    // Get close buttons
    const closeButtons = document.querySelectorAll(".close");

    // Open User Modal
    addUserButton.addEventListener("click", function () {
        userModal.style.display = "block";
    });

    // Open Product Modal
    addProductButton.addEventListener("click", function () {
        productModal.style.display = "block";
    });

    // Close Modals
    closeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            userModal.style.display = "none";
            productModal.style.display = "none";
        });
    });

    // Close Modals when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === userModal) {
            userModal.style.display = "none";
        }
        if (event.target === productModal) {
            productModal.style.display = "none";
        }
    });

    // Handle User Form Submission
    document
        .getElementById("userForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            const userName = document.getElementById("userName").value;
            const userEmail = document.getElementById("userEmail").value;
            const userPassword = document.getElementById("userPassword").value;
            const userRole = document.getElementById("userRole").value;

            // Add logic to save user data (e.g., send to backend)
            console.log("User Data:", {
                userName,
                userEmail,
                userPassword,
                userRole,
            });

            // Close modal after submission
            userModal.style.display = "none";
        });

    // Handle Product Form Submission
    document
        .getElementById("productForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            const productName = document.getElementById("productName").value;
            const productPrice = document.getElementById("productPrice").value;
            const productDescription =
                document.getElementById("productDescription").value;
            const productImage =
                document.getElementById("productImage").files[0];

            // Create a FormData object to handle file uploads
            const formData = new FormData();
            formData.append("name", productName);
            formData.append("price", productPrice);
            formData.append("description", productDescription);
            formData.append("image", productImage);

            // Log the FormData (replace with actual backend submission logic)
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            // Close modal after submission
            productModal.style.display = "none";
        });

    // Handle Password Update
    document
        .querySelector(".password-section .btn-save")
        .addEventListener("click", function (event) {
            event.preventDefault();

            const currentPassword =
                document.getElementById("current-password").value;
            const newPassword = document.getElementById("new-password").value;
            const confirmPassword =
                document.getElementById("confirm-password").value;

            // Validate inputs
            if (!currentPassword || !newPassword || !confirmPassword) {
                alert("Please fill in all fields.");
                return;
            }

            if (newPassword !== confirmPassword) {
                alert("New password and confirm password do not match.");
                return;
            }

            // Add logic to update password (e.g., send to backend)
            console.log("Password Update Data:", {
                currentPassword,
                newPassword,
                confirmPassword,
            });

            // Clear fields after submission
            document.getElementById("current-password").value = "";
            document.getElementById("new-password").value = "";
            document.getElementById("confirm-password").value = "";

            alert("Password updated successfully!");
        });
});
