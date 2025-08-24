const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️" // sun icon for light mode
    : "🌙"; // moon icon for dark mode
});
