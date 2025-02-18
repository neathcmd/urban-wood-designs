<<<<<<< HEAD
<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".scroll-slide");
  hiddenElements.forEach((el) => observer.observe(el));
=======
// const menuBtn = document.getElementById("menu-btn");
// const mobileMenu = document.getElementById("mobile-menu");

=======
// const menuBtn = document.getElementById("menu-btn");
// const mobileMenu = document.getElementById("mobile-menu");

>>>>>>> main
// menuBtn.addEventListener("click", () => {
//   mobileMenu.classList.toggle("hidden");
// });

class ProgressBar {
  constructor(element) {
    this.element = element;
    this.label = element.dataset.label;
    this.percentage = parseInt(element.dataset.percentage);
    this.delay = parseInt(element.dataset.delay);
    this.width = 0;
    this.count = 0;
    this.init();
  }

  init() {
    // Create HTML structure
    this.element.innerHTML = `
      <div class="mb-4">
        <span class="text-black text-lg font-medium">${this.label}</span>
      </div>
      <div class="relative w-full bg-gray-300 h-3 rounded-full">
        <div class="relative bg-amber-800 h-full rounded-full transition-all duration-1000 ease-out" style="width: 0%">
          <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-amber-600 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap">
            0%
          </div>
        </div>
      </div>
    `;

    // Observe intersection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.animateProgress();
            }, this.delay);
          } else {
            this.resetProgress();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(this.element);
  }

  animateProgress() {
    const progressBar = this.element.querySelector(".bg-amber-800");
    const percentageDisplay = this.element.querySelector(".bg-amber-600");

    // Animate progress bar
    let start = 0;
    const duration = 1000; // match progress bar duration
    const step = 16; // for smooth animation (60fps)
    const increment = (this.percentage * step) / duration;

    const timer = setInterval(() => {
      start += increment;
      if (start >= this.percentage) {
        this.width = this.percentage;
        this.count = this.percentage;
        clearInterval(timer);
      } else {
        this.width = Math.floor(start);
        this.count = Math.floor(start);
      }
      progressBar.style.width = `${this.width}%`;
      percentageDisplay.textContent = `${this.count}%`;
    }, step);
  }

  resetProgress() {
    const progressBar = this.element.querySelector(".bg-amber-900");
    const percentageDisplay = this.element.querySelector(".bg-amber-600");

    this.width = 0;
    this.count = 0;
    progressBar.style.width = "0%";
    percentageDisplay.textContent = "0%";
  }
}

// Initialize all progress bars
document.querySelectorAll(".progress-bar").forEach((element) => {
  new ProgressBar(element);
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> main
});

