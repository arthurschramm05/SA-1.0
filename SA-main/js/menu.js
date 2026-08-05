(function () {
    const botaoMenu = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    if (!botaoMenu || !nav) {
        return;
    }

    botaoMenu.addEventListener("click", function () {
        nav.classList.toggle("menu-aberto");
        const aberto = nav.classList.contains("menu-aberto");
        botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
        botaoMenu.textContent = aberto ? "✕" : "☰";
    });
})();
