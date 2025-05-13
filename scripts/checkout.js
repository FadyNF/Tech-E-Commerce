document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".form-step");
  const stepIndicators = document.querySelectorAll(".step-indicator .step");
  let currentStep = 0;

  showStep(currentStep);

  document.querySelectorAll(".next-step").forEach((button) => {
    button.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
        updateStepIndicator();
      }
    });
  });

  // Previous button click
  document.querySelectorAll(".prev-step").forEach((button) => {
    button.addEventListener("click", () => {
      currentStep--;
      showStep(currentStep);
      updateStepIndicator();
    });
  });

  // Show specific step
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === stepIndex);
    });

    // Disable/enable navigation buttons
    const backButtons = document.querySelectorAll(".prev-step");
    backButtons.forEach((btn) => {
      btn.disabled = stepIndex === 0;
    });
  }

  // Update step indicator circles
  function updateStepIndicator() {
    stepIndicators.forEach((indicator, index) => {
      indicator.classList.remove("active", "completed");

      if (index < currentStep) {
        indicator.classList.add("completed");
      } else if (index === currentStep) {
        indicator.classList.add("active");
      }
    });
  }

  // Form validation
  function validateStep(stepIndex) {
    const currentStepFields = steps[stepIndex].querySelectorAll("[required]");
    let isValid = true;

    currentStepFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "#ff6b6b";
        isValid = false;
        field.classList.add("shake");
        setTimeout(() => {
          field.classList.remove("shake");
        }, 500);
      } else {
        field.style.borderColor = "";
      }
    });

    return isValid;
  }

  // Payment method selection
  const paymentMethods = document.querySelectorAll(".payment-method");
  paymentMethods.forEach((method) => {
    method.addEventListener("click", function () {
      paymentMethods.forEach((m) => m.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Card number formatting
  const cardNumberInput = document.getElementById("cardNumber");
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\s+/g, "");
      if (value.length > 0) {
        value = value.match(new RegExp(".{1,4}", "g")).join(" ");
      }
      e.target.value = value;
    });
  }

  // Expiry date formatting
  const expiryInput = document.getElementById("expiry");
  if (expiryInput) {
    expiryInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      e.target.value = value;
    });
  }

  // Form submission
  const form = document.querySelector(".checkout-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    setTimeout(() => {
      showSuccessModal();
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 2000);
  });

  // Show success modal
  function showSuccessModal() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    const modal = document.createElement("div");
    modal.className = "success-modal-container";

    modal.innerHTML = `
        <div class="success-modal glass-card">
            <i class="fas fa-check-circle success-icon"></i>
            <h2>Order Confirmed!</h2>
            <p>Your order has been placed successfully. A confirmation email has been sent to your inbox.</p>
            <button  onclick="window.location.href='/pages/product_list.html'" id="continueShopping" class="btn btn-primary">Continue Shopping</button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    document
      .getElementById("continueShopping")
      .addEventListener("click", function () {
        overlay.remove();
        modal.remove();
      });
  }
});
