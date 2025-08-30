// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme preference - Don't use localStorage in artifacts
let currentTheme = "dark"; // Default theme

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  body.setAttribute("data-theme", currentTheme);
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

// Hide cursor when hovering over form inputs
document
  .querySelectorAll(".form-group input, .form-group textarea")
  .forEach((input) => {
    input.addEventListener("mouseenter", () => {
      cursor.classList.add("hide");
    });

    input.addEventListener("mouseleave", () => {
      cursor.classList.remove("hide");
    });

    input.addEventListener("focus", () => {
      cursor.classList.add("hide");
    });

    input.addEventListener("blur", () => {
      cursor.classList.remove("hide");
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

// Improved Tech Stack Animation Control
const techStackTrack = document.querySelector(".tech-stack-track");
const techStackSection = document.querySelector(".tech-stack-section");

let isHoveringTechSection = false;
let techItemHoverTimeout = null;

// Section-level hover controls
if (techStackSection && techStackTrack) {
  techStackSection.addEventListener("mouseenter", () => {
    isHoveringTechSection = true;
    techStackTrack.style.animationDuration = "60s"; // Slow down on hover
  });

  techStackSection.addEventListener("mouseleave", () => {
    isHoveringTechSection = false;
    techStackTrack.style.animationDuration = "30s"; // Normal speed
    techStackTrack.style.animationPlayState = "running"; // Ensure it's running
  });
}

// Improved individual tech item interactions with debouncing
document.querySelectorAll(".tech-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    // Clear any existing timeout
    if (techItemHoverTimeout) {
      clearTimeout(techItemHoverTimeout);
    }

    // Only pause if we're hovering the tech section
    if (isHoveringTechSection) {
      const track = this.closest(".tech-stack-track");
      if (track) {
        track.style.animationPlayState = "paused";
      }
    }
  });

  item.addEventListener("mouseleave", function () {
    // Use timeout to prevent rapid play/pause cycles
    techItemHoverTimeout = setTimeout(() => {
      if (isHoveringTechSection) {
        const track = this.closest(".tech-stack-track");
        if (track) {
          track.style.animationPlayState = "running";
        }
      }
    }, 100); // Small delay to prevent jittery behavior
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

// Global spotlight management to prevent multiple active spotlights
let heroSpotlight = null;
let portfolioSpotlight = null;
let contactSpotlight = null;
let activeSpotlight = null;

// Spotlight Effect Background Class
class SpotlightBackground {
  constructor(canvas, sectionType = "hero") {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = 0;
    this.height = 0;
    this.sectionType = sectionType; // "hero", "portfolio", or "contact"

    // Mouse tracking
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    // Animation properties
    this.time = 0;
    this.pulseIntensity = 1;

    // Spotlight properties based on section
    this.spotlightRadius = this.getSpotlightRadius();
    this.maxSpotlightRadius = this.getMaxSpotlightRadius();
    this.minSpotlightRadius = this.getMinSpotlightRadius();

    // Click effects
    this.clickEffects = [];

    // Active state
    this.isActive = false;
    this.fadeAlpha = 0; // For smooth transitions

    this.init();
    this.setupEventListeners();
    this.animate();
  }

  getSpotlightRadius() {
    switch (this.sectionType) {
      case "portfolio":
        return 300;
      case "contact":
        return 350;
      default:
        return 400; // hero
    }
  }

  getMaxSpotlightRadius() {
    switch (this.sectionType) {
      case "portfolio":
        return 400;
      case "contact":
        return 450;
      default:
        return 500; // hero
    }
  }

  getMinSpotlightRadius() {
    switch (this.sectionType) {
      case "portfolio":
        return 250;
      case "contact":
        return 275;
      default:
        return 300; // hero
    }
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
    const parentSection = document.getElementById(
      this.sectionType === "hero" ? "home" : this.sectionType
    );

    if (parentSection) {
      parentSection.addEventListener("mouseenter", () => {
        this.activateSpotlight();
      });

      parentSection.addEventListener("mouseleave", () => {
        this.deactivateSpotlight();
      });

      // Global mouse move listener for better tracking
      document.addEventListener("mousemove", (e) => {
        if (this.isActive) {
          const rect = this.canvas.getBoundingClientRect();
          this.targetMouseX = e.clientX - rect.left;
          this.targetMouseY = e.clientY - rect.top;
        }
      });

      parentSection.addEventListener("click", (e) => {
        if (this.isActive) {
          const rect = this.canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          this.addClickEffect(x, y);
        }
      });
    }

    // Touch support
    if (parentSection) {
      parentSection.addEventListener("touchmove", (e) => {
        if (this.isActive) {
          e.preventDefault();
          const rect = this.canvas.getBoundingClientRect();
          const touch = e.touches[0];
          this.targetMouseX = touch.clientX - rect.left;
          this.targetMouseY = touch.clientY - rect.top;
        }
      });

      parentSection.addEventListener("touchstart", (e) => {
        if (this.isActive) {
          e.preventDefault();
          const rect = this.canvas.getBoundingClientRect();
          const touch = e.touches[0];
          const x = touch.clientX - rect.left;
          const y = touch.clientY - rect.top;
          this.addClickEffect(x, y);
        }
      });
    }
  }

  activateSpotlight() {
    // Deactivate other spotlights first
    if (activeSpotlight && activeSpotlight !== this) {
      activeSpotlight.deactivateSpotlight();
    }

    this.isActive = true;
    activeSpotlight = this;
    this.targetSpotlightRadius = this.maxSpotlightRadius;
  }

  deactivateSpotlight() {
    this.isActive = false;
    if (activeSpotlight === this) {
      activeSpotlight = null;
    }
    this.targetSpotlightRadius = this.minSpotlightRadius;
  }

  addClickEffect(x, y) {
    const maxRadius =
      this.sectionType === "contact"
        ? 175
        : this.sectionType === "portfolio"
        ? 150
        : 200;
    const intensity =
      this.sectionType === "contact"
        ? 1.3
        : this.sectionType === "portfolio"
        ? 1.2
        : 1.5;

    this.clickEffects.push({
      x: x,
      y: y,
      radius: 0,
      maxRadius: maxRadius,
      life: 1.0,
      decay: 0.03,
      intensity: intensity,
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
    // Smooth fade in/out
    if (this.isActive) {
      this.fadeAlpha = Math.min(1, this.fadeAlpha + 0.05);
    } else {
      this.fadeAlpha = Math.max(0, this.fadeAlpha - 0.05);
    }

    // Clear canvas first
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Don't draw if completely faded out
    if (this.fadeAlpha <= 0) return;

    // Smooth mouse following
    this.mouseX = this.lerp(this.mouseX, this.targetMouseX, 0.08);
    this.mouseY = this.lerp(this.mouseY, this.targetMouseY, 0.08);

    // Animate spotlight radius with subtle pulsing
    this.time += 0.02;
    const pulseAmount =
      this.sectionType === "contact"
        ? 18
        : this.sectionType === "portfolio"
        ? 15
        : 20;
    const pulse = Math.sin(this.time) * pulseAmount;
    this.spotlightRadius = this.lerp(
      this.spotlightRadius,
      (this.targetSpotlightRadius || this.maxSpotlightRadius) + pulse,
      0.05
    );

    // Get current theme for color adaptation
    const isDarkTheme = document.body.getAttribute("data-theme") !== "light";

    // Create main spotlight gradient with unified colors
    const mainGradient = this.ctx.createRadialGradient(
      this.mouseX,
      this.mouseY,
      0,
      this.mouseX,
      this.mouseY,
      this.spotlightRadius
    );

    // All sections now use the same purple/violet theme in dark mode
    if (isDarkTheme) {
      // Dark theme - purple/violet spotlight for all sections
      const hue = 280;
      const saturation = this.sectionType === "contact" ? 45 : 50;
      const baseOpacity = this.sectionType === "contact" ? 0.35 : 0.4;
      const opacity = baseOpacity * this.fadeAlpha;

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
    } else {
      // Light theme - darker grey spotlight for all sections
      const baseOpacity =
        this.sectionType === "contact"
          ? 0.3
          : this.sectionType === "portfolio"
          ? 0.35
          : 0.25;
      const opacity = baseOpacity * this.fadeAlpha;

      const baseGray =
        this.sectionType === "contact"
          ? 45
          : this.sectionType === "portfolio"
          ? 40
          : 100;

      mainGradient.addColorStop(
        0,
        `rgba(${baseGray}, ${baseGray}, ${baseGray}, ${opacity})`
      );
      mainGradient.addColorStop(
        0.2,
        `rgba(${baseGray + 10}, ${baseGray + 10}, ${baseGray + 10}, ${
          opacity * 0.75
        })`
      );
      mainGradient.addColorStop(
        0.4,
        `rgba(${baseGray + 20}, ${baseGray + 20}, ${baseGray + 20}, ${
          opacity * 0.5
        })`
      );
      mainGradient.addColorStop(
        0.6,
        `rgba(${baseGray + 30}, ${baseGray + 30}, ${baseGray + 30}, ${
          opacity * 0.25
        })`
      );
      mainGradient.addColorStop(
        0.8,
        `rgba(${baseGray + 40}, ${baseGray + 40}, ${baseGray + 40}, ${
          opacity * 0.125
        })`
      );
      mainGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    }

    // Apply main spotlight
    this.ctx.globalCompositeOperation = "screen";
    this.ctx.fillStyle = mainGradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Add secondary light for depth (only for hero section in dark theme)
    if (this.sectionType === "hero" && isDarkTheme) {
      const secondaryGradient = this.ctx.createRadialGradient(
        this.mouseX,
        this.mouseY,
        0,
        this.mouseX,
        this.mouseY,
        this.spotlightRadius * 0.6
      );

      const secondaryHue = 260;
      const opacity = 0.4 * this.fadeAlpha;

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
    }

    // Draw click effects
    this.drawClickEffects();

    // Reset composite operation
    this.ctx.globalCompositeOperation = "source-over";

    // Add subtle grid pattern for texture (only for hero)
    if (this.sectionType === "hero") {
      this.drawGridPattern();
    }
  }

  drawClickEffects() {
    this.clickEffects.forEach((effect) => {
      const burstGradient = this.ctx.createRadialGradient(
        effect.x,
        effect.y,
        0,
        effect.x,
        effect.y,
        effect.radius
      );

      const intensity = effect.life * effect.intensity * this.fadeAlpha;
      const isDarkTheme = document.body.getAttribute("data-theme") !== "light";

      if (!isDarkTheme) {
        // Light theme click effects - darker for all sections
        const grayBase =
          this.sectionType === "contact"
            ? 25
            : this.sectionType === "portfolio"
            ? 30
            : 80;

        burstGradient.addColorStop(
          0,
          `rgba(${grayBase}, ${grayBase}, ${grayBase}, ${intensity * 0.6})`
        );
        burstGradient.addColorStop(
          0.3,
          `rgba(${grayBase + 10}, ${grayBase + 10}, ${grayBase + 10}, ${
            intensity * 0.5
          })`
        );
        burstGradient.addColorStop(
          0.6,
          `rgba(${grayBase + 20}, ${grayBase + 20}, ${grayBase + 20}, ${
            intensity * 0.4
          })`
        );
        burstGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        // Dark theme click effects - purple for all sections
        burstGradient.addColorStop(
          0,
          `rgba(191, 163, 255, ${intensity * 0.8})`
        );
        burstGradient.addColorStop(
          0.3,
          `rgba(154, 77, 255, ${intensity * 0.6})`
        );
        burstGradient.addColorStop(
          0.6,
          `rgba(109, 29, 255, ${intensity * 0.4})`
        );
        burstGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      }

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

      if (!isDarkTheme) {
        const centerGray =
          this.sectionType === "contact"
            ? 15
            : this.sectionType === "portfolio"
            ? 20
            : 70;
        this.ctx.fillStyle = `rgba(${centerGray}, ${centerGray}, ${centerGray}, ${intensity})`;
      } else {
        this.ctx.fillStyle = `rgba(191, 163, 255, ${intensity})`;
      }
      this.ctx.fill();
    });
  }

  drawGridPattern() {
    const isDarkTheme = document.body.getAttribute("data-theme") !== "light";
    this.ctx.globalCompositeOperation = "overlay";
    this.ctx.strokeStyle = isDarkTheme
      ? `rgba(255, 255, 255, ${0.02 * this.fadeAlpha})`
      : `rgba(0, 0, 0, ${0.02 * this.fadeAlpha})`;
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
    // Update effects
    this.updateClickEffects();

    // Draw spotlight effect
    this.drawSpotlight();

    // Continue animation
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize spotlight backgrounds when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Hero section spotlight
  const heroCanvas = document.getElementById("fluidCanvas");
  if (heroCanvas) {
    heroSpotlight = new SpotlightBackground(heroCanvas, "hero");
  }

  // Portfolio section spotlight
  const portfolioCanvas = document.getElementById("portfolioCanvas");
  if (portfolioCanvas) {
    portfolioSpotlight = new SpotlightBackground(portfolioCanvas, "portfolio");
  }

  // Contact section spotlight
  const contactCanvas = document.getElementById("contactCanvas");
  if (contactCanvas) {
    contactSpotlight = new SpotlightBackground(contactCanvas, "contact");
  }
});

console.log("Enhanced portfolio website loaded successfully!");
