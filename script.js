document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Multi-Page Section Switching ---
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".page-section");

  function showSection(targetId) {
    sections.forEach((section) => {
      if (section.id === targetId) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${targetId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Handle nav item clicks
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").replace("#", "");
      if (targetId) {
        showSection(targetId);
        window.location.hash = targetId;
      }
    });
  });

  // Load section based on URL hash (e.g. portfolio.com/#projects)
  const initialHash = window.location.hash.replace("#", "");
  if (initialHash && document.getElementById(initialHash)) {
    showSection(initialHash);
  }

  // --- 2. Dark / Light Mode Toggle ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlTag = document.documentElement;

  // Read saved theme or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlTag.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });

  function setTheme(theme) {
    htmlTag.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update Icon
    const icon = themeToggleBtn.querySelector("i");
    if (theme === "dark") {
      icon.className = "fa-solid fa-sun";
    } else {
      icon.className = "fa-solid fa-moon";
    }
  }
});