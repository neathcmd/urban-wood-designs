function toggleCollapse(id, button) {
  const content = document.getElementById(id);
  const allContents = document.querySelectorAll(".collapse-content");
  const allButtons = document.querySelectorAll(".faq-button");

  // Close all other items
  allContents.forEach((item) => {
    if (item.id !== id && item.classList.contains("active")) {
      item.classList.remove("active");
      item.style.maxHeight = null;
    }
  });

  allButtons.forEach((btn) => {
    if (btn !== button && btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  });

  // Toggle the clicked item
  button.classList.toggle("active");
  if (content.classList.contains("active")) {
    content.classList.remove("active");
    content.style.maxHeight = null;
  } else {
    content.classList.add("active");
    content.style.maxHeight = content.scrollHeight + "px";
  }
}
