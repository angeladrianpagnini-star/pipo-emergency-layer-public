(() => {
  const navigation = document.querySelector(".advanced-sync-nav");

  if (!navigation) return;

  navigation.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const target = document.querySelector(link.getAttribute("href"));
    const laboratory = target?.closest("details#pipoAdvancedModules");

    if (!target || !laboratory || laboratory.open) return;

    event.preventDefault();
    laboratory.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
  });
})();
