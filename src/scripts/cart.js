// Cart data structure
const cartItems = [
  {
    id: 1,
    name: "Corner Lounge",
    sku: "SKU_1423",
    originalPrice: 1340,
    price: 990,
    quantity: 1,
    image:
      "https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/p24-600x600.jpg",
  },
  {
    id: 2,
    name: "Cosy Sofa",
    sku: "SKU_1408",
    originalPrice: 899,
    price: 699,
    quantity: 1,
    image:
      "https://xtratheme.com/elementor/furniture/wp-content/uploads/sites/16/2019/09/p9i-2-600x600.jpg",
  },
  {
    id: 3,
    name: "Cosy Sofa",
    sku: "SKU_1405",
    originalPrice: 450,
    price: 399,
    quantity: 1,
    image:
      "https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/p6-600x600.jpg",
  },
];

// Render cart items
function renderCartItems() {
  const cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = cartItems
    .map(
      (item) => `
            <div class="bg-gray-200 rounded-lg p-4 flex gap-4" data-id="${item.id}">
                <img src="${item.image}"  class="w-28 h-28 object-cover rounded"/>
                <div class="flex-grow">
                    <h3 class="text-xl text-brown-800 font-medium">${item.name}</h3>
                    <p class="text-sm text-gray-600">SKU: ${item.sku}</p>
                    <div class="mt-2">
                        <span class="text-gray-900">Price: </span>
                        <span class="line-through">$${item.originalPrice}</span>
                        <span class="text-gray-900 ml-2">$${item.price}</span>
                    </div>
                    <div class="flex items-center gap-2 mt-2">
                        <button class="px-3 py-1 bg-white rounded decrease-qty">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="px-3 py-1 bg-white rounded increase-qty">+</button>
                    </div>
                </div>
                <button class="remove-item text-red-500 hover:text-red-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `
    )
    .join("");

  updateTotals();
  attachEventListeners();
}

// Update cart totals
function updateTotals() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  document.getElementById("subtotal").textContent = `$${subtotal}`;
  document.getElementById("total").textContent = `$${subtotal}`;
}

// Attach event listeners
function attachEventListeners() {
  // Quantity adjustment
  document.querySelectorAll(".decrease-qty").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemContainer = e.target.closest("[data-id]");
      const itemId = parseInt(itemContainer.dataset.id);
      const item = cartItems.find((i) => i.id === itemId);
      if (item.quantity > 1) {
        item.quantity--;
        itemContainer.querySelector(".quantity").textContent = item.quantity;
        updateTotals();
      }
    });
  });

  document.querySelectorAll(".increase-qty").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemContainer = e.target.closest("[data-id]");
      const itemId = parseInt(itemContainer.dataset.id);
      const item = cartItems.find((i) => i.id === itemId);
      item.quantity++;
      itemContainer.querySelector(".quantity").textContent = item.quantity;
      updateTotals();
    });
  });

  // Remove item
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemContainer = e.target.closest("[data-id]");
      const itemId = parseInt(itemContainer.dataset.id);
      const itemIndex = cartItems.findIndex((i) => i.id === itemId);
      cartItems.splice(itemIndex, 1);
      renderCartItems();
    });
  });
}

// Modal functionality
document.addEventListener("DOMContentLoaded", () => {
  // Search modal
  const searchIcon = document.getElementById("search-icon");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchBackdrop = document.getElementById("searchBackdrop");
  const searchContainer = document.getElementById("searchContainer");
  const closeSearch = document.getElementById("closeSearch");

  function toggleSearchModal(show) {
    searchOverlay.classList.toggle("hidden", !show);
    setTimeout(() => {
      searchBackdrop.style.opacity = show ? "0.5" : "0";
      searchContainer.style.opacity = show ? "1" : "0";
      searchContainer.style.transform = show
        ? "translate(-50%, -50%) scale(1)"
        : "translate(-50%, -50%) scale(0.95)";
    }, 10);
  }

  searchIcon.addEventListener("click", () => toggleSearchModal(true));
  closeSearch.addEventListener("click", () => toggleSearchModal(false));

  // Auth modal
  const userIcon = document.getElementById("userIcon");
  const authModal = document.getElementById("authModal");
  const authBackdrop = document.getElementById("authBackdrop");
  const authContainer = document.getElementById("authContainer");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  function toggleAuthModal(show) {
    authModal.classList.toggle("hidden", !show);
    setTimeout(() => {
      authBackdrop.style.opacity = show ? "0.5" : "0";
      authContainer.style.opacity = show ? "1" : "0";
      authContainer.style.transform = show
        ? "translate(-50%, -50%) scale(1)"
        : "translate(-50%, -50%) scale(0.95)";
    }, 10);
  }

  userIcon.addEventListener("click", () => toggleAuthModal(true));
  authBackdrop.addEventListener("click", () => toggleAuthModal(false));

  // Switch between login and signup
  loginBtn.addEventListener("click", () => {
    loginForm.style.transform = "translateX(0)";
    loginForm.style.opacity = "1";
    signupForm.style.transform = "translateX(100%)";
    signupForm.style.opacity = "0";
    loginBtn.classList.add("border-b-2", "border-amber-700");
    signupBtn.classList.remove("border-b-2", "border-amber-700");
  });

  signupBtn.addEventListener("click", () => {
    loginForm.style.transform = "translateX(-100%)";
    loginForm.style.opacity = "0";
    signupForm.style.transform = "translateX(0)";
    signupForm.style.opacity = "1";
    signupBtn.classList.add("border-b-2", "border-amber-700");
    loginBtn.classList.remove("border-b-2", "border-amber-700");
  });
});

// Initialize cart
renderCartItems();

// Navigation between steps
function navigateToStep(step) {
  // Update progress indicators
  document.querySelectorAll(".progress-step").forEach((el) => {
    if (el.dataset.step === step) {
      el.querySelector("span").classList.remove("text-gray-400");
      el.querySelector("span").classList.add("text-gray-900");
    } else {
      el.querySelector("span").classList.add("text-gray-400");
      el.querySelector("span").classList.remove("text-gray-900");
    }
  });

  // Show/hide content sections
  document.getElementById("cartContent").classList.add("hidden");
  document.getElementById("checkoutContent").classList.add("hidden");
  document.getElementById("orderCompleteContent").classList.add("hidden");

  document.getElementById(`${step}Content`).classList.remove("hidden");
}

// Initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Add navigation listeners
  document.querySelectorAll(".progress-step").forEach((step) => {
    step.addEventListener("click", (e) => {
      e.preventDefault();
      navigateToStep(step.dataset.step);
    });
  });

  // Checkout button listener
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    navigateToStep("checkout");
  });

  // Place order button listener
  document.getElementById("placeOrderBtn").addEventListener("click", () => {
    navigateToStep("complete");
  });
});
