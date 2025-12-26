document.addEventListener("DOMContentLoaded", () => {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  els.forEach((el) => io.observe(el));

  document.querySelectorAll("form.demo-form").forEach((form) => {
    const ok = form.querySelector(".formSuccess");
    const bad = form.querySelector(".formError");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (bad) bad.hidden = true;
      if (ok) ok.hidden = false;
    });
  });

  // Demo theme picker (saved across demos)
  (function () {
    const root = document.documentElement;

    const savedTheme = localStorage.getItem("ef_demo_theme");
    const savedAccent = localStorage.getItem("ef_demo_accent");
    if (savedTheme) root.dataset.theme = savedTheme;
    if (savedAccent) root.dataset.accent = savedAccent;

    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-theme]");
      const a = e.target.closest("[data-accent]");
      const r = e.target.closest("[data-reset]");

      if (t) {
        const v = t.getAttribute("data-theme");
        root.dataset.theme = v;
        localStorage.setItem("ef_demo_theme", v);
      }

      if (a) {
        const v = a.getAttribute("data-accent");
        root.dataset.accent = v;
        localStorage.setItem("ef_demo_accent", v);
      }

      if (r) {
        delete root.dataset.theme;
        delete root.dataset.accent;
        localStorage.removeItem("ef_demo_theme");
        localStorage.removeItem("ef_demo_accent");
      }
    });
  })();
});
