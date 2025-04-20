document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("wishlist-container");
  const clearBtn = document.getElementById("clear-wishlist-btn");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Initialize wishlist
  renderWishlist();

  // Clear button handler
  if (clearBtn) {
    clearBtn.addEventListener("click", clearWishlist);
  }

  function renderWishlist() {
    if (wishlist.length === 0) {
      showEmptyState();
      toggleClearButton(false);
      return;
    }
    
    container.innerHTML = '';
    wishlist.forEach((item, index) => {
      const card = createWishlistItem(item, index);
      container.appendChild(card);
    });
    toggleClearButton(true);
  }

  function createWishlistItem(item, index) {
    const card = document.createElement("div");
    card.classList.add("wishlist-item");
    card.dataset.id = item.id || createUniqueId(item);
    
    card.innerHTML = `
      <div class="wishlist-item-img-container">
        <img src="${item.img || '/media/placeholder-image.png'}" 
             alt="${item.name || 'Product image'}" 
             onerror="this.src='/media/placeholder-image.png'"/>
      </div>
      <div class="wishlist-item-content">
        <h3>${item.name || "Unknown Product"}</h3>
        <p>${item.price || "Price not available"}</p>
      </div>
      <button class="remove-btn" aria-label="Remove ${item.name || 'item'}">
        <i class="fa-solid fa-trash"></i> Remove
      </button>
    `;

    card.querySelector(".remove-btn").addEventListener("click", async () => {
      await removeItemWithAnimation(item, card);
    });

    return card;
  }

  async function removeItemWithAnimation(item, card) {
    // Get all items below the one being removed
    const allItems = Array.from(container.children);
    const cardIndex = allItems.indexOf(card);
    const nextCards = allItems.slice(cardIndex + 1);

    // Create placeholder to prevent container collapse
    const placeholder = document.createElement('div');
    placeholder.style.height = `${card.offsetHeight}px`;
    placeholder.style.marginBottom = '20px';
    placeholder.style.pointerEvents = 'none';
    placeholder.style.visibility = 'hidden';
    container.insertBefore(placeholder, card.nextSibling);

    // Animate the card removal
    const fadeOut = card.animate([
      { opacity: 1, transform: 'translateY(0) scale(1)' },
      { opacity: 0, transform: 'translateY(-20px) scale(0.95)' }
    ], {
      duration: 300,
      easing: 'cubic-bezier(0.33, 1, 0.68, 1)'
    });

    // Take card out of flow
    card.style.position = 'absolute';
    card.style.width = `${card.offsetWidth}px`;

    // Animate siblings up (FLIP technique)
    const moveUpAnimations = nextCards.map(sibling => {
      return sibling.animate([
        { transform: 'translateY(0)' },
        { transform: `translateY(-${card.offsetHeight + 20}px)` }
      ], {
        duration: 300,
        easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
        fill: 'forwards'
      });
    });

    // Wait for animations to complete
    await Promise.all([
      fadeOut.finished,
      ...moveUpAnimations.map(a => a.finished)
    ]);

    // Update data and DOM
    wishlist = wishlist.filter(w => w.id !== item.id || JSON.stringify(w) !== JSON.stringify(item));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    
    card.remove();
    placeholder.remove();
    
    // Reset sibling positions
    nextCards.forEach(sibling => {
      sibling.style.transform = '';
      sibling.getAnimations().forEach(a => a.cancel());
    });

    // Update UI
    if (wishlist.length === 0) {
      showEmptyState();
      toggleClearButton(false);
    }
  }

  function clearWishlist() {
    if (wishlist.length === 0) return;
    
    // Animate all items out
    const items = Array.from(container.children);
    const animations = items.map((card, i) => {
      return card.animate([
        { opacity: 1, transform: 'translateY(0) scale(1)' },
        { opacity: 0, transform: `translateY(${20 * (i + 1)}px) scale(0.9)` }
      ], {
        duration: 300,
        delay: i * 50,
        easing: 'cubic-bezier(0.33, 1, 0.68, 1)'
      });
    });
  
    Promise.all(animations.map(a => a.finished)).then(() => {
      wishlist = [];
      localStorage.removeItem("wishlist");
      showEmptyState();
      toggleClearButton(false);
    });
  }

  function showEmptyState() {
    container.innerHTML = `
      <div class="empty-message">
        <p>Your wishlist is empty.</p>
        <p class="sub-text">Explore now and find something you love ✨</p>
        <a href="/pages/product_list.html" class="browse-btn">Start Exploring</a>
      </div>
    `;
  }

  function toggleClearButton(show) {
    if (clearBtn) {
      clearBtn.style.display = show ? "block" : "none";
    }
  }

  function createUniqueId(item) {
    return `${item.name?.replace(/\s+/g, '-').toLowerCase()}-${Math.random().toString(36).substr(2, 4)}`;
  }
});

// Connect with product list (add this to your product list JS)
function toggleWishlistItem(product) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const existingIndex = wishlist.findIndex(item => item.id === product.id);

  if (existingIndex >= 0) {
    wishlist.splice(existingIndex, 1);
  } else {
    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.image
    });
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  return existingIndex < 0; // Returns true if item was added
}