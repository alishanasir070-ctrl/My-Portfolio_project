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