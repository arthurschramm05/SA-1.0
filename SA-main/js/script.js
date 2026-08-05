document.addEventListener("DOMContentLoaded", function () {
    const paginaAtual = window.location.pathname;

    // Código da página de produtos
    if (paginaAtual === "/produtos.html" || paginaAtual === "produtos.html") {
        const inputBusca = document.getElementById("buscar-produtos");
        const selectOrdenacao = document.getElementById("ordenar-produtos");

        if (inputBusca) {
            inputBusca.addEventListener("input", function () {
                buscarProdutos(inputBusca.value);
            });
        }

        if (selectOrdenacao) {
            selectOrdenacao.addEventListener("change", function () {
                ordenarProdutos(selectOrdenacao.value);
            });
        }
    }

    // Código do formulário de contato
    if (paginaAtual === "/contato.html" || paginaAtual === "contato.html") {
        const form = document.querySelector("form");

        if (form) {
            form.addEventListener("submit", function (evento) {
                evento.preventDefault();

                const nome = document.querySelector(`input[type="text"]`);
                const email = document.querySelector(`input[type="email"]`);
                const mensagem = document.querySelector("textarea");

                if (!nome || !email || !mensagem) {
                    return;
                }

                if (nome.value.trim() === "" || mensagem.value.trim() === "") {
                    alert("Preencha todos os campos obrigatórios.");
                    return;
                }

                const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
                if (!emailValido) {
                    alert("E-mail inválido.");
                    return;
                }

                alert("Mensagem enviada com sucesso!");
                form.reset();
            });
        }
    }

    // Código do slider de depoimentos
    if (paginaAtual === "/index.html" || paginaAtual === "index.html" || paginaAtual === "/" || paginaAtual === "") {
        const depoimentos = [
            { nome: "Maria", comentario: "A scooter é linda, silenciosa e perfeita para o dia a dia.", avaliacao: "★★★★★" },
            { nome: "João", comentario: "Muito prática para ir ao trabalho e economiza bastante.", avaliacao: "★★★★" },
            { nome: "Lucas Barni", comentario: "Entrega rápida e atendimento excelente. Estou muito satisfeita.", avaliacao: "★★★★" },
            { nome: "Emerson", comentario: "Não gostei muito. Não durou muito tempo.", avaliacao: "★★" },
            { nome: "Cristofer", comentario: "Super confortável e muito estilosa. Recomendo para todos.", avaliacao: "★★★★★" }
        ];

        const lista = document.getElementById("depoimentos-track");
        const botoes = document.getElementById("slider-pontos");
        let atual = 0;

        function criarSlider() {
            lista.innerHTML = "";
            botoes.innerHTML = "";

            depoimentos.forEach(function(depoimento, index) {
                const slide = document.createElement("div");
                slide.className = "depoimento-slide";
                slide.innerHTML = `<div class="depoimento-conteudo"><strong>${depoimento.nome}</strong><p>${depoimento.comentario}</p><div class="estrelas">${depoimento.avaliacao}</div></div>`;
                lista.appendChild(slide);

                const botao = document.createElement("button");
                botao.className = "slider-ponto";
                botao.addEventListener("click", function() {
                    atual = index;
                    mudarSlide();
                });
                botoes.appendChild(botao);
            });

            mudarSlide();
        }

        function mudarSlide() {
            const slides = document.querySelectorAll(".depoimento-slide");

            slides.forEach(function(slide, index) {
                slide.classList.toggle("ativo", index === atual);
            });

            const pontos = document.querySelectorAll(".slider-ponto");
            pontos.forEach(function(ponto, index) {
                ponto.classList.toggle("ativo", index === atual);
            });
        }

        setInterval(function() {
            atual = (atual + 1) % depoimentos.length;
            mudarSlide();
        }, 5000);

        criarSlider();
    }
});
