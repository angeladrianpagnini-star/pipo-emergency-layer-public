(() => {
  const navigation = document.querySelector(".advanced-sync-nav");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!navigation) return;

  navigation.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const selector = link.getAttribute("href");
    const target = document.querySelector(selector);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", selector);
  });
})();
