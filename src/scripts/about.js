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
});

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.element.classList.add("visible");
            setTimeout(() => {
              this.animateProgress();
            }, this.delay);
          } else {
            this.element.classList.remove("visible");
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

    let start = 0;
    const duration = 1000;
    const step = 16;
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
    const progressBar = this.element.querySelector(".bg-amber-800");
    const percentageDisplay = this.element.querySelector(".bg-amber-600");

    this.width = 0;
    this.count = 0;
    progressBar.style.width = "0%";
    percentageDisplay.textContent = "0%";
  }
}

// Initialize progress bars when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".progress-bar").forEach((element) => {
    new ProgressBar(element);
  });
});

// Number animation
document.addEventListener("DOMContentLoaded", function () {
  const numberElements = document.querySelectorAll("[data-target]");
  const numbersSection = document.getElementById("numbersSection");
  let hasAnimated = false;

  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      element.textContent = currentValue;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          numberElements.forEach((element) => {
            const target = parseInt(element.getAttribute("data-target"));
            animateValue(element, 0, target, 2000);
          });
        }
      });
    },
    {
      root: null,
      threshold: 0.5,
    }
  );

  observer.observe(numbersSection);
});
