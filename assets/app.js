(() => {
  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("siteNav");
  const toggle = document.getElementById("navToggle");
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close nav when clicking a link (mobile)
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Copy wechat
  const copyBtn = document.getElementById("copyWechat");
  const wechatId = document.getElementById("wechatId");
  if (copyBtn && wechatId) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(wechatId.textContent.trim());
        copyBtn.textContent = "已复制";
        setTimeout(() => (copyBtn.textContent = "复制微信号"), 1200);
      } catch (e) {
        alert("复制失败：请手动复制 " + wechatId.textContent.trim());
      }
    });
  }

  // Header theme: dark in hero, light elsewhere
  const hero = document.getElementById("home");
  const setHeaderTheme = (theme) => {
    header.classList.toggle("header--dark", theme === "dark");
    header.classList.toggle("header--light", theme === "light");
  };

  // Active section highlight
  const links = Array.from(document.querySelectorAll(".nav__link"));
  const sections = Array.from(document.querySelectorAll("section[id][data-theme]"));

  const activate = (id) => {
    links.forEach(l => l.classList.toggle("is-active", l.dataset.section === id));
  };

  // IntersectionObserver for active section
  const secObserver = new IntersectionObserver((entries) => {
    // Pick the most visible section
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible && visible.target && visible.target.id) {
      const id = visible.target.id;
      activate(id);

      const theme = visible.target.getAttribute("data-theme") || "light";
      setHeaderTheme(theme);
    }
  }, { threshold: [0.25, 0.4, 0.55, 0.7] });

  sections.forEach(s => secObserver.observe(s));

  // If user loads mid-page
  const initialTheme = hero && hero.getBoundingClientRect().bottom > 80 ? "dark" : "light";
  setHeaderTheme(initialTheme);

})();
