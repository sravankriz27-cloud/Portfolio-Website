// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Custom Cursor
const cursor = document.querySelector(".custom-cursor");
const interactiveSections = document.querySelectorAll(".cursor-interactive");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Update mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;
  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Show/hide cursor in interactive sections
interactiveSections.forEach((section) => {
  section.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    section.style.cursor = "none";
  });

  section.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    section.style.cursor = "auto";
    cursor.classList.remove("hover");
  });
});

// Hover effects for interactive elements
document
  .querySelectorAll(
    ".portfolio-item, .contact-form, .view-portfolio-btn, .submit-btn"
  )
  .forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });

    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });

// Tech Stack Animation Control
const techStackTrack = document.querySelector(".tech-stack-track");
const techStackSection = document.querySelector(".tech-stack-section");

// Add speed control on hover
if (techStackSection && techStackTrack) {
  techStackSection.addEventListener("mouseenter", () => {
    techStackTrack.style.animationDuration = "60s"; // Slow down on hover
  });

  techStackSection.addEventListener("mouseleave", () => {
    techStackTrack.style.animationDuration = "30s"; // Normal speed
  });
}

// Individual tech item interactions
document.querySelectorAll(".tech-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    // Pause the entire animation when hovering over individual items
    const track = this.closest(".tech-stack-track");
    if (track) {
      track.style.animationPlayState = "paused";
    }
  });

  item.addEventListener("mouseleave", function () {
    // Resume animation when leaving individual items
    const track = this.closest(".tech-stack-track");
    if (track) {
      track.style.animationPlayState = "running";
    }
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Enhanced portfolio item interactions
document.querySelectorAll(".portfolio-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
    this.style.boxShadow = "0 20px 40px rgba(154, 77, 255, 0.15)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
    this.style.boxShadow = "none";
  });

  // Add click event for portfolio items
  item.addEventListener("click", function () {
    console.log(
      "Portfolio item clicked:",
      this.querySelector("h3").textContent
    );
  });
});

// Form submission handling
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const subject = this.querySelector('input[type="text"]:nth-of-type(2)').value;
  const message = this.querySelector("textarea").value;

  // Basic validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Show success message
  alert("Thank you for your message! I'll get back to you soon.");

  // Reset form
  this.reset();

  console.log("Form submitted:", { name, email, subject, message });
});

// Parallax effect for noise background
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const noise = document.querySelector(".noise-bg");
  if (noise) {
    noise.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Navigation active state
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 300) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Debounce function for performance
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Additional scroll-based animations can be added here
}, 10);

window.addEventListener("scroll", optimizedScrollHandler);

// Social links click tracking
document.querySelectorAll(".social a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const platform = this.getAttribute("title");
    console.log(`Social link clicked: ${platform}`);
  });
});

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    // Add modal close functionality here if needed
  }

  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", function () {
  document.body.classList.remove("keyboard-navigation");
});

// Spotlight Effect Background
class SpotlightBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = 0;
    this.height = 0;

    // Mouse tracking
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    // Animation properties
    this.time = 0;
    this.pulseIntensity = 1;

    // Spotlight properties
    this.spotlightRadius = 400;
    this.maxSpotlightRadius = 500;
    this.minSpotlightRadius = 300;

    // Click effects
    this.clickEffects = [];

    this.init();
    this.setupEventListeners();
    this.animate();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Initialize mouse position to center
    this.mouseX = this.width / 2;
    this.mouseY = this.height / 2;
    this.targetMouseX = this.mouseX;
    this.targetMouseY = this.mouseY;
  }

  setupEventListeners() {
    // Mouse movement
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.targetMouseX = e.clientX - rect.left;
      this.targetMouseY = e.clientY - rect.top;
    });

    // Mouse click for enhanced light burst
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.addClickEffect(x, y);
    });

    // Touch support
    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.targetMouseX = touch.clientX - rect.left;
      this.targetMouseY = touch.clientY - rect.top;
    });

    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      this.addClickEffect(x, y);
    });

    // Mouse enter/leave for spotlight size
    this.canvas.addEventListener("mouseenter", () => {
      this.targetSpotlightRadius = this.maxSpotlightRadius;
    });

    this.canvas.addEventListener("mouseleave", () => {
      this.targetSpotlightRadius = this.minSpotlightRadius;
    });
  }

  addClickEffect(x, y) {
    this.clickEffects.push({
      x: x,
      y: y,
      radius: 0,
      maxRadius: 200,
      life: 1.0,
      decay: 0.03,
      intensity: 1.5,
    });
  }

  updateClickEffects() {
    this.clickEffects = this.clickEffects.filter((effect) => {
      effect.radius += 8;
      effect.life -= effect.decay;
      effect.intensity -= 0.02;
      return effect.life > 0;
    });
  }

  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  drawSpotlight() {
    // Smooth mouse following
    this.mouseX = this.lerp(this.mouseX, this.targetMouseX, 0.08);
    this.mouseY = this.lerp(this.mouseY, this.targetMouseY, 0.08);

    // Animate spotlight radius with subtle pulsing
    this.time += 0.02;
    const pulse = Math.sin(this.time) * 20;
    this.spotlightRadius = this.lerp(
      this.spotlightRadius,
      (this.targetSpotlightRadius || this.maxSpotlightRadius) + pulse,
      0.05
    );

    // Get current theme for color adaptation
    const isDarkTheme = document.body.getAttribute("data-theme") !== "light";

    // Fill background based on theme
    this.ctx.fillStyle = isDarkTheme ? "#000000" : "#f8f9fa";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Create main spotlight gradient with theme-aware colors
    const mainGradient = this.ctx.createRadialGradient(
      this.mouseX,
      this.mouseY,
      0,
      this.mouseX,
      this.mouseY,
      this.spotlightRadius
    );

    // Dynamic color based on position - using lilac/violet theme
    const hue = 280; // Purple/violet base hue
    const saturation = 60 + Math.sin(this.time) * 20;
    const opacity = isDarkTheme ? 0.4 : 0.2;

    // Create sophisticated gradient stops
    mainGradient.addColorStop(
      0,
      `hsla(${hue}, ${saturation}%, 85%, ${opacity})`
    );
    mainGradient.addColorStop(
      0.2,
      `hsla(${hue}, ${saturation}%, 70%, ${opacity * 0.75})`
    );
    mainGradient.addColorStop(
      0.4,
      `hsla(${hue}, ${saturation}%, 55%, ${opacity * 0.5})`
    );
    mainGradient.addColorStop(
      0.6,
      `hsla(${hue}, ${saturation}%, 40%, ${opacity * 0.25})`
    );
    mainGradient.addColorStop(
      0.8,
      `hsla(${hue}, ${saturation}%, 25%, ${opacity * 0.125})`
    );
    mainGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    // Apply main spotlight
    this.ctx.globalCompositeOperation = "screen";
    this.ctx.fillStyle = mainGradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Add subtle secondary light for depth
    const secondaryGradient = this.ctx.createRadialGradient(
      this.mouseX,
      this.mouseY,
      0,
      this.mouseX,
      this.mouseY,
      this.spotlightRadius * 0.6
    );

    const secondaryHue = 260; // Slightly different violet
    secondaryGradient.addColorStop(
      0,
      `hsla(${secondaryHue}, 40%, 90%, ${opacity * 0.375})`
    );
    secondaryGradient.addColorStop(
      0.5,
      `hsla(${secondaryHue}, 40%, 60%, ${opacity * 0.2})`
    );
    secondaryGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    this.ctx.fillStyle = secondaryGradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw click effects
    this.drawClickEffects();

    // Reset composite operation
    this.ctx.globalCompositeOperation = "source-over";

    // Add subtle grid pattern for texture
    this.drawGridPattern();
  }

  drawClickEffects() {
    this.clickEffects.forEach((effect) => {
      // Expanding light burst
      const burstGradient = this.ctx.createRadialGradient(
        effect.x,
        effect.y,
        0,
        effect.x,
        effect.y,
        effect.radius
      );

      const intensity = effect.life * effect.intensity;
      burstGradient.addColorStop(0, `rgba(191, 163, 255, ${intensity * 0.8})`); // Lilac
      burstGradient.addColorStop(0.3, `rgba(154, 77, 255, ${intensity * 0.6})`); // Violet
      burstGradient.addColorStop(0.6, `rgba(109, 29, 255, ${intensity * 0.4})`); // Deep violet
      burstGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      this.ctx.fillStyle = burstGradient;
      this.ctx.fillRect(
        effect.x - effect.radius,
        effect.y - effect.radius,
        effect.radius * 2,
        effect.radius * 2
      );

      // Bright center point
      this.ctx.beginPath();
      this.ctx.arc(effect.x, effect.y, effect.radius * 0.1, 0, 2 * Math.PI);
      this.ctx.fillStyle = `rgba(191, 163, 255, ${intensity})`;
      this.ctx.fill();
    });
  }

  drawGridPattern() {
    const isDarkTheme = document.body.getAttribute("data-theme") !== "light";
    this.ctx.globalCompositeOperation = "overlay";
    this.ctx.strokeStyle = isDarkTheme
      ? "rgba(255, 255, 255, 0.02)"
      : "rgba(0, 0, 0, 0.02)";
    this.ctx.lineWidth = 0.5;

    const gridSize = 50;

    // Vertical lines
    for (let x = 0; x <= this.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= this.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

    this.ctx.globalCompositeOperation = "source-over";
  }

  animate() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update effects
    this.updateClickEffects();

    // Draw spotlight effect
    this.drawSpotlight();

    // Continue animation
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize spotlight background when page loads
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("fluidCanvas");
  if (canvas) {
    new SpotlightBackground(canvas);
  }
});

console.log("Portfolio website loaded successfully!");
