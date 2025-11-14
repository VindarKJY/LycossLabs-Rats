// Throttle function for better performance
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func(...args);
        timeout = null;
      }, wait);
    }
  };
}

// ===== STYLE 4: Glitch Typing =====
const glitchTexts = [
  "LYCOSLABS 2025",
  "FUTURE IS NOW",
  "CODE & CREATE",
  "TECH REVOLUTION",
];

let glitchIndex = 0;
let glitchCharIndex = 0;
let isGlitchDeleting = false;

// ✅ TAMBAHKAN VARIABEL INI (INI YANG HILANG!)
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDuration = 2000;

function typeGlitch() {
  const glitchElement = document.getElementById("glitchText");

  // ✅ TAMBAHKAN PENGECEKAN NULL
  if (!glitchElement) {
    console.error("Element #glitchText tidak ditemukan!");
    return;
  }

  const currentGlitchText = glitchTexts[glitchIndex];

  if (!isGlitchDeleting) {
    const displayText = currentGlitchText.substring(0, glitchCharIndex + 1);
    glitchElement.textContent = displayText;
    glitchElement.setAttribute("data-text", displayText);
    glitchCharIndex++;

    if (glitchCharIndex === currentGlitchText.length) {
      isGlitchDeleting = true;
      setTimeout(typeGlitch, pauseDuration);
      return;
    }
  } else {
    const displayText = currentGlitchText.substring(0, glitchCharIndex - 1);
    glitchElement.textContent = displayText;
    glitchElement.setAttribute("data-text", displayText);
    glitchCharIndex--;

    if (glitchCharIndex === 0) {
      isGlitchDeleting = false;
      glitchIndex = (glitchIndex + 1) % glitchTexts.length;
    }
  }

  setTimeout(typeGlitch, isGlitchDeleting ? deletingSpeed : typingSpeed);
}

// Start Style 4 setelah DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  typeGlitch();
});

// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking nav link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest("nav") && navMenu.classList.contains("active")) {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Smooth scroll for anchor links with error handling
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.warn(`Target ${href} not found`);
    }
  });
});

// Navbar scroll effect with throttling
const navbar = document.getElementById("navbar");
const handleScroll = throttle(() => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}, 100);

window.addEventListener("scroll", handleScroll);

// Scroll animation with section-level stagger
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -60px 0px",
};

// Ensure sections also fade-in
document.querySelectorAll(".section").forEach((sec) => {
  sec.classList.add("fade-in");
});

const revealWithStagger = (container) => {
  const items = container.querySelectorAll(".fade-in");
  items.forEach((el, i) => {
    el.style.setProperty("--delay", `${i * 0.1}s`);
    el.classList.add("visible");
  });
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const target = entry.target;
    if (target.classList.contains("section")) {
      // Reveal the section and its children with stagger
      target.classList.add("visible");
      revealWithStagger(target);
    } else {
      target.classList.add("visible");
    }
    obs.unobserve(target);
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Animated counter
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  let start = null;

  const updateCounter = (timestamp) => {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * target);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(updateCounter);
};

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        const statNumber = entry.target.querySelector(".stat-number");
        if (statNumber) {
          animateCounter(statNumber);
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-card").forEach((card) => {
  statObserver.observe(card);
});

// Parallax effect for hero with throttling
const handleParallax = throttle(() => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
}, 16); // ~60fps

window.addEventListener("scroll", handleParallax);
