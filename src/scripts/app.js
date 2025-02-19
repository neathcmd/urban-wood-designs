// for icon functionality
document.addEventListener("DOMContentLoaded", function () {
  // Search functionality
  const searchIcon = document.getElementById("search-icon");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchBackdrop = document.getElementById("searchBackdrop");
  const searchContainer = document.getElementById("searchContainer");
  const closeSearch = document.getElementById("closeSearch");
  const searchInput = document.getElementById("searchInput");
  const searchSuggestions = document.getElementById("searchSuggestions");

  // Sample suggestions
  const sampleSuggestions = [
    "Popular Products",
    "New Arrivals",
    "Best Sellers",
    "Special Offers",
    "Trending Items",
    "Seasonal Collections",
  ];

  // Search Modal Functions
  searchIcon.addEventListener("click", function (e) {
    e.preventDefault();
    searchOverlay.classList.remove("hidden");
    requestAnimationFrame(() => {
      searchBackdrop.classList.add("opacity-50");
      searchContainer.classList.add("opacity-100", "scale-100");
      searchContainer.classList.remove("scale-95", "opacity-0");
    });
    searchInput.focus();
  });

  function closeSearchOverlay() {
    searchBackdrop.classList.remove("opacity-50");
    searchContainer.classList.remove("opacity-100", "scale-100");
    searchContainer.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      searchOverlay.classList.add("hidden");
      searchInput.value = "";
      searchSuggestions.classList.add("hidden");
    }, 200);
  }

  closeSearch.addEventListener("click", closeSearchOverlay);
  searchBackdrop.addEventListener("click", closeSearchOverlay);

  // Search suggestions functionality
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    if (searchTerm.length > 0) {
      const filteredSuggestions = sampleSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchTerm)
      );
      displaySuggestions(filteredSuggestions);
    } else {
      searchSuggestions.classList.add("hidden");
    }
  });

  function displaySuggestions(suggestions) {
    if (suggestions.length > 0) {
      searchSuggestions.innerHTML = suggestions
        .map(
          (suggestion) => `
                      <div class="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-0">
                          ${suggestion}
                      </div>
                  `
        )
        .join("");
      searchSuggestions.classList.remove("hidden");
    } else {
      searchSuggestions.classList.add("hidden");
    }
  }

  // for login form functionality
  const userIcon = document.getElementById("userIcon");
  const authModal = document.getElementById("authModal");
  const authBackdrop = document.getElementById("authBackdrop");
  const authContainer = document.getElementById("authContainer");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  userIcon.addEventListener("click", function (e) {
    e.preventDefault();
    authModal.classList.remove("hidden");
    requestAnimationFrame(() => {
      authBackdrop.classList.add("opacity-50");
      authContainer.classList.add("opacity-100", "scale-100");
      authContainer.classList.remove("scale-95", "opacity-0");
    });
  });

  function closeAuthModal() {
    authBackdrop.classList.remove("opacity-50");
    authContainer.classList.remove("opacity-100", "scale-100");
    authContainer.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      authModal.classList.add("hidden");
    }, 200);
  }

  authBackdrop.addEventListener("click", closeAuthModal);

  // Login/Signup toggle
  loginBtn.addEventListener("click", () => {
    loginForm.classList.remove("-translate-x-full");
    loginForm.classList.add("translate-x-0");
    loginForm.classList.remove("opacity-0");
    loginForm.classList.add("opacity-100");
    loginForm.classList.remove("absolute");

    signupForm.classList.remove("translate-x-0");
    signupForm.classList.add("translate-x-full");
    signupForm.classList.remove("opacity-100");
    signupForm.classList.add("opacity-0");
    signupForm.classList.add("absolute");

    loginBtn.classList.add("border-b-2", "border-amber-700", "text-amber-700");
    signupBtn.classList.remove(
      "border-b-2",
      "border-amber-600",
      "text-amber-600"
    );
    signupBtn.classList.add("text-amber-700");
  });

  signupBtn.addEventListener("click", () => {
    loginForm.classList.remove("translate-x-0");
    loginForm.classList.add("-translate-x-full");
    loginForm.classList.remove("opacity-100");
    loginForm.classList.add("opacity-0");
    loginForm.classList.add("absolute");

    signupForm.classList.remove("translate-x-full");
    signupForm.classList.add("translate-x-0");
    signupForm.classList.remove("opacity-0");
    signupForm.classList.add("opacity-100");
    signupForm.classList.remove("absolute");

    signupBtn.classList.add("border-b-2", "border-amber-700", "text-amber-700");
    loginBtn.classList.remove(
      "border-b-2",
      "border-amber-600",
      "text-amber-600"
    );
    loginBtn.classList.add("text-amber-700");
  });

  // Handle escape key for both modals
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!searchOverlay.classList.contains("hidden")) {
        closeSearchOverlay();
      }
      if (!authModal.classList.contains("hidden")) {
        closeAuthModal();
      }
    }
  });

  // Form submission handlers
  document.querySelector("#loginForm form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    console.log(`Login Attempt: Email: ${email}, Password: ${password}`);
  });

  document.querySelector("#signupForm form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    console.log(
      `Signup Attempt: Name: ${name}, Email: ${email}, Password: ${password}`
    );
  });
});

// for dropdown menu functionality
const categoryTrigger = document.querySelector(".category-trigger");
const megaMenu = document.querySelector(".mega-menu-container");

categoryTrigger.addEventListener("mouseenter", () => {
  megaMenu.classList.add("active");
});

categoryTrigger.addEventListener("mouseleave", () => {
  megaMenu.classList.remove("active");
});

megaMenu.addEventListener("mouseenter", () => {
  megaMenu.classList.add("active");
});

megaMenu.addEventListener("mouseleave", () => {
  megaMenu.classList.remove("active");
});
