// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.querySelector('svg').classList.toggle('fa-eye');
        this.querySelector('svg').classList.toggle('fa-eye-slash');
    });
});

// Enable/Disable Delete Account button based on checkbox
const deleteConfirmCheckbox = document.getElementById('delete-confirm');
const deleteAccountButton = document.querySelector('.btn-delete-account');
const deletePasswordInput = document.getElementById('delete-password');

deleteConfirmCheckbox.addEventListener('change', function () {
    deleteAccountButton.disabled = !this.checked || deletePasswordInput.value.trim() === '';
});

deletePasswordInput.addEventListener('input', function () {
    deleteAccountButton.disabled = !deleteConfirmCheckbox.checked || this.value.trim() === '';
});

// Handle Edit and Save buttons for Personal Info
const personalInfoEditButton = document.querySelector('.info:nth-child(1) .btn-edit');
const personalInfoFields = document.querySelectorAll('.info:nth-child(1) p');
const personalInfoSaveButton = document.querySelector('.info:nth-child(1) .btn-save');

personalInfoEditButton.addEventListener('click', function () {
    // Make personal info fields editable
    personalInfoFields.forEach(field => {
        if (field.textContent.includes(':')) {
            const key = field.textContent.split(':')[0].trim();
            const value = field.textContent.split(':')[1].trim();
            field.innerHTML = `<strong>${key}:</strong> <input type="text" value="${value}" />`;
        }
    });
    personalInfoSaveButton.style.display = 'inline-block'; // Show the Save button
});

personalInfoSaveButton.addEventListener('click', function () {
    // Save personal info changes
    personalInfoFields.forEach(field => {
        const input = field.querySelector('input');
        if (input) {
            const key = field.querySelector('strong').textContent.replace(':', '');
            const value = input.value;
            field.innerHTML = `<strong>${key}:</strong> ${value}`;
        }
    });
    personalInfoSaveButton.style.display = 'none'; // Hide the Save button
});

// Handle Edit and Save buttons for Billing Information
const billingInfoEditButton = document.querySelector('.info:nth-child(2) .btn-edit');
const billingInfoFields = document.querySelectorAll('.info:nth-child(2) p');
const billingInfoSaveButton = document.querySelector('.info:nth-child(2) .btn-save');

billingInfoEditButton.addEventListener('click', function () {
    // Make billing info fields editable
    billingInfoFields.forEach(field => {
        if (field.textContent.includes(':')) {
            const key = field.textContent.split(':')[0].trim();
            const value = field.textContent.split(':')[1].trim();
            field.innerHTML = `<strong>${key}:</strong> <input type="text" value="${value}" />`;
        }
    });
    billingInfoSaveButton.style.display = 'inline-block'; // Show the Save button
});

billingInfoSaveButton.addEventListener('click', function () {
    // Save billing info changes
    billingInfoFields.forEach(field => {
        const input = field.querySelector('input');
        if (input) {
            const key = field.querySelector('strong').textContent.replace(':', '');
            const value = input.value;
            field.innerHTML = `<strong>${key}:</strong> ${value}`;
        }
    });
    billingInfoSaveButton.style.display = 'none'; // Hide the Save button
    
});

// Handle Delete Account button
deleteAccountButton.addEventListener('click', function () {
    window.location.href = '../pages/index.html'; // Redirect to the homepage after deletion
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Menu toggle functionality
    menuToggle.addEventListener("click", function (event) {
        navLinks.classList.toggle("active");
        event.stopPropagation(); // Prevents immediate closing when clicking the menu button
    });
});