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
    { threshold: 0.12 }
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
});
