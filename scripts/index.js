document.addEventListener("DOMContentLoaded", () => {
  // Dropdown functionality
  const dropdowns = document.querySelectorAll(".w-dropdown");

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".w-dropdown-toggle");
    const menu = dropdown.querySelector(".w-dropdown-list");

    if (toggle && menu) {
      toggle.addEventListener("click", e => {
        e.preventDefault();
        const isOpen = menu.style.display === "block";

        // Close all other dropdowns
        document.querySelectorAll(".w-dropdown-list").forEach(d => {
          if (d !== menu) d.style.display = "none";
        });

        // Toggle this dropdown
        menu.style.display = isOpen ? "none" : "block";
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", e => {
    if (!e.target.closest(".w-dropdown")) {
      document.querySelectorAll(".w-dropdown-list").forEach(menu => {
        menu.style.display = "none";
      });
    }
  });

  // Mobile menu toggle functionality
  const mobileMenuButton = document.querySelector(".nav-mobile-menu-button");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuButton && navMenu) {
    mobileMenuButton.addEventListener("click", () => {
      const isOpen = navMenu.style.display === "block";
      navMenu.style.display = isOpen ? "none" : "block";
    });
  }

  // Mega menu hover functionality
  const megaMenuDropdowns = document.querySelectorAll(".nav-menu-dropdown[data-hover='false']");

  megaMenuDropdowns.forEach(dropdown => {
    const list = dropdown.querySelector(".w-dropdown-list");

    if (list) {
      dropdown.addEventListener("mouseenter", () => {
        list.style.display = "block";
      });

      dropdown.addEventListener("mouseleave", () => {
        list.style.display = "none";
      });
    }
  });

  // Smooth scroll effect for cards
  const cardsWrapper = document.querySelector(".cards-wrapper");
  if (cardsWrapper) {
    cardsWrapper.addEventListener("wheel", e => {
      e.preventDefault();
      cardsWrapper.scrollBy({
        top: e.deltaY * 0.5, // Adjust scrolling speed
        behavior: "smooth"
      });
    });
  }

  // Button click alert
  const buttons = document.querySelectorAll(".button");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      alert("You clicked the button!");
    });
  });

  // Text button click alert
  const textButton = document.querySelector(".text-button");
  if (textButton) {
    textButton.addEventListener("click", e => {
      e.preventDefault();
      alert("We will be in touch shortly!");
    });
  }

  // Log page load
  console.log("Page loaded and ready!");
});

// WebFont loading script to load specific Google Fonts
WebFont.load({
  google: { families: ["Manrope:regular", "DM Sans:regular"] }
});

// Webflow-specific script to add classes based on the device
!(function (o, c) {
  const n = c.documentElement;
  const t = " w-mod-";
  n.className += t + "js";
  if ("ontouchstart" in o || (o.DocumentTouch && c instanceof DocumentTouch)) {
    n.className += t + "touch";
  }
})(window, document);