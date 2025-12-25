document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // Fake form submit
  document.querySelectorAll(".demo-form").forEach((form) => {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const success = form.querySelector(".form-success");
      if (success) {
        success.style.display = "block";
        success.textContent = "Thanks — we’ll call you shortly.";
      }
    });
  });

  // Smooth scroll to quote section
  document.querySelectorAll('a[href="#quote"]').forEach((link) => {
    link.addEventListener("click", (ev) => {
      const target = document.getElementById("quote");
      if (target) {
        ev.preventDefault();
        target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
      }
    });
  });
});
