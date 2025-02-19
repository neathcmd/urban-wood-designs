// Get DOM elements
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuOverlay = document.getElementById("menu-overlay");
const categoryBtn = document.getElementById("mobile-category-btn");
const categoryDropdown = document.getElementById("mobile-category-dropdown");

// Toggle menu
function toggleMenu() {
  const isOpen = mobileMenu.style.right === "0px";

  mobileMenu.style.right = isOpen ? "-100%" : "0px";
  menuOverlay.classList.toggle("hidden");
  menuBtn.innerHTML = isOpen ? "☰" : "×";

  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? "auto" : "hidden";
}

// Event listeners
menuBtn.addEventListener("click", toggleMenu);
menuOverlay.addEventListener("click", toggleMenu);

// Category dropdown toggle
categoryBtn.addEventListener("click", () => {
  categoryDropdown.classList.toggle("hidden");
  const icon = categoryBtn.querySelector("i");
  icon.classList.toggle("fa-chevron-down");
  icon.classList.toggle("fa-chevron-up");
});

// Close menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.style.right === "0px") {
    toggleMenu();
  }
});
