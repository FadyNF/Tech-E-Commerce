const wrapper = document.querySelector(".wrapper");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

registerLink.onclick = () => {
  wrapper.classList.add("active");
};

loginLink.onclick = () => {
  wrapper.classList.remove("active");
};

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

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const errorText = document.getElementById("loginError");

  if (users[email] && users[email] === password) {

    window.location.href = "/pages/index.html";
  } else {
    showError(errorText, "Invalid credentials");
  }
});

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
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
