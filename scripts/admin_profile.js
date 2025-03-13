// Sample data for users and products
let users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
];

let products = [
    { id: 1, name: "Laptop", price: 999, description: "High-performance laptop" },
    { id: 2, name: "Smartphone", price: 699, description: "Latest smartphone model" },
];

// DOM Elements
const usersList = document.querySelector(".users-list");
const productsList = document.querySelector(".products-list");
const userModal = document.getElementById("user-modal");
const productModal = document.getElementById("product-modal");
const closeModalButtons = document.querySelectorAll(".close-modal");
const userForm = document.getElementById("user-form");
const productForm = document.getElementById("product-form");

// Render Users
function renderUsers() {
    usersList.innerHTML = users
        .map(
            (user) => `
            <div class="user-card">
                <h4>${user.name}</h4>
                <p>Email: ${user.email}</p>
                <p>Role: ${user.role}</p>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </div>
        `
        )
        .join("");
}

// Render Products
function renderProducts() {
    productsList.innerHTML = products
        .map(
            (product) => `
            <div class="product-card">
                <h4>${product.name}</h4>
                <p>Price: $${product.price}</p>
                <p>Description: ${product.description}</p>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        `
        )
        .join("");
}

// Open User Modal
function openUserModal(user = null) {
    if (user) {
        document.getElementById("user-name").value = user.name;
        document.getElementById("user-email").value = user.email;
        document.getElementById("user-role").value = user.role;
        userForm.dataset.id = user.id;
    } else {
        userForm.reset();
        delete userForm.dataset.id;
    }
    userModal.style.display = "flex";
}

// Open Product Modal
function openProductModal(product = null) {
    if (product) {
        document.getElementById("product-name").value = product.name;
        document.getElementById("product-price").value = product.price;
        document.getElementById("product-description").value = product.description;
        productForm.dataset.id = product.id;
    } else {
        productForm.reset();
        delete productForm.dataset.id;
    }
    productModal.style.display = "flex";
}

// Close Modals
closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        userModal.style.display = "none";
        productModal.style.display = "none";
    });
});

// Save User
userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = userForm.dataset.id;
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const role = document.getElementById("user-role").value;

    if (id) {
        // Edit existing user
        const userIndex = users.findIndex((user) => user.id == id);
        users[userIndex] = { id: +id, name, email, role };
    } else {
        // Add new user
        const newUser = { id: users.length + 1, name, email, role };
        users.push(newUser);
    }

    renderUsers();
    userModal.style.display = "none";
});

// Save Product
productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = productForm.dataset.id;
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const description = document.getElementById("product-description").value;

    if (id) {
        // Edit existing product
        const productIndex = products.findIndex((product) => product.id == id);
        products[productIndex] = { id: +id, name, price, description };
    } else {
        // Add new product
        const newProduct = { id: products.length + 1, name, price, description };
        products.push(newProduct);
    }

    renderProducts();
    productModal.style.display = "none";
});

// Edit User
function editUser(id) {
    const user = users.find((user) => user.id == id);
    openUserModal(user);
}

// Delete User
function deleteUser(id) {
    users = users.filter((user) => user.id != id);
    renderUsers();
}

// Edit Product
function editProduct(id) {
    const product = products.find((product) => product.id == id);
    openProductModal(product);
}

// Delete Product
function deleteProduct(id) {
    products = products.filter((product) => product.id != id);
    renderProducts();
}

// Event Listeners for Add Buttons
document.querySelector(".btn-add-user").addEventListener("click", () => openUserModal());
document.querySelector(".btn-add-product").addEventListener("click", () => openProductModal());

// Initial Render
renderUsers();
renderProducts();