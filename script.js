document.addEventListener("DOMContentLoaded", () => {
  /* ===================================================
     1. THEME TOGGLER (DARK / LIGHT MODE)
     =================================================== */
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  const themeIcon = themeToggleBtn.querySelector("i");

  // Check saved theme from localStorage or default to 'dark'
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  htmlElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.className = "fa-solid fa-sun"; // Sun icon in dark mode
    } else {
      themeIcon.className = "fa-solid fa-moon"; // Moon icon in light mode
    }
  }

  /* ===================================================
     2. MOBILE MENU TOGGLE
     =================================================== */
  const menuToggleBtn = document.getElementById("menu-toggle");
  const navMenu = document.querySelector("nav");

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  /* ===================================================
     3. SMOOTH SCROLLING & AUTO-CLOSE MOBILE MENU
     =================================================== */
  const navLinks = document.querySelectorAll(".nav-link, .nav-link-btn");
  const sections = document.querySelectorAll(".page-section");
  const scrollContainer = document.querySelector(".content-container");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);

        if (targetSection && scrollContainer) {
          // Scroll container to section smoothly
          scrollContainer.scrollTo({
            top: targetSection.offsetTop - 70, // Adjust for fixed header height
            behavior: "smooth",
          });
        }

        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
      }
    });
  });

  /* ===================================================
     4. ACTIVE LINK TRACKER ON SNAP SCROLL
     =================================================== */
  if (scrollContainer && sections.length > 0) {
    scrollContainer.addEventListener("scroll", () => {
      let currentSectionId = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120; // Trigger threshold
        const sectionHeight = section.clientHeight;

        if (scrollContainer.scrollTop >= sectionTop && scrollContainer.scrollTop < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute("id");
        }
      });

      if (currentSectionId) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
});
/* ===================================================
   INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
   =================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".content-container");
  const sections = document.querySelectorAll(".page-section");

  // Har section ke andar pehle <h1>, <h2>, cards wagaira par reveal classes add karna
  sections.forEach((section) => {
    const animatableElements = section.querySelectorAll(
      ".section-header, .hero-container, .about-grid, .edu-card-unique, .skill-category, .cert-card, .timeline-item, .project-card, .contact-wrapper"
    );

    animatableElements.forEach((el, index) => {
      el.classList.add("reveal-item");
      // Sequence delay for grid items
      const delayClass = `reveal-delay-${(index % 3) + 1}`;
      el.classList.add(delayClass);
    });
  });

  // Intersection Observer setup
  const observerOptions = {
    root: scrollContainer, // Scroll container parent
    threshold: 0.35 // Jab section 35% visible ho to trigger ho
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});
/* ===================================================
   DYNAMIC 3D TILT EFFECT FOR CARDS
   =================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Un sabhi cards ko select karna jinki par tilt effect chahiye
  const tiltSelectors = ".edu-card-unique, .project-card, .skill-category, .cert-card";
  const cards = document.querySelectorAll(tiltSelectors);

  cards.forEach((card) => {
    card.classList.add("tilt-card");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cardWidth = rect.width;
      const cardHeight = rect.height;

      // Card ke center point se mouse ka distance calculate karna
      const centerX = rect.left + cardWidth / 2;
      const centerY = rect.top + cardHeight / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Max rotation angles (Max 12 degrees for subtle effect)
      const rotateX = ((-1 * mouseY) / (cardHeight / 2)) * 12;
      const rotateY = ((mouseX) / (cardWidth / 2)) * 12;

      // Apply 3D rotation transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    // Mouse leave hone par card original flat position mein wapas aayega
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });
});

