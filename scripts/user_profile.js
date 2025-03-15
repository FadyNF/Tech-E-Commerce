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

// Handle Edit and Save buttons for Billing Information
const billingInfoEditButton = document.querySelector(
    ".info:nth-child(2) .btn-edit"
);
const billingInfoFields = document.querySelectorAll(".info:nth-child(2) p");
const billingInfoSaveButton = document.querySelector(
    ".info:nth-child(2) .btn-save"
);

billingInfoEditButton.addEventListener("click", function () {
    // Hide the Edit button and show the Save button
    billingInfoEditButton.style.display = "none";
    billingInfoSaveButton.style.display = "inline-block";

    // Make billing info fields editable
    billingInfoFields.forEach((field) => {
        if (field.textContent.includes(":")) {
            const key = field.textContent.split(":")[0].trim();
            const value = field.textContent.split(":")[1].trim();
            field.innerHTML = `<strong>${key}:</strong> <input type="text" value="${value}" />`;
        }
    });
});

billingInfoSaveButton.addEventListener("click", function () {
    // Save billing info changes
    billingInfoFields.forEach((field) => {
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
    billingInfoSaveButton.style.display = "none";
    billingInfoEditButton.style.display = "inline-block";
});

// Handle Delete Account button
deleteAccountButton.addEventListener("click", function () {
    window.location.href = "../pages/index.html"; // Redirect to the homepage after deletion
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

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
});
