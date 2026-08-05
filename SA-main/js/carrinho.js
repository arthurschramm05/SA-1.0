const produtosDisponiveis = [
    { id: 1, nome: "Scooter X11", preco: 8999 },
    { id: 2, nome: "Triciclo X15 3000W", preco: 10999 },
    { id: 3, nome: "Scooter MIA 1000W", preco: 6999 },
    { id: 4, nome: "Scooter 3000W VTX", preco: 14999 },
    { id: 5, nome: "Capacete", preco: 189 },
    { id: 6, nome: "Baú", preco: 299 }
];

function carregarCarrinho() {
    let dados = localStorage.getItem("carrinhoApexRide");
    let carrinhoSalvo = [];

    if (dados) {
        carrinhoSalvo = JSON.parse(dados);
    }

    return carrinhoSalvo;
}

let carrinho = carregarCarrinho();

const listaProdutos = document.getElementById("produtos-disponiveis");
const listaCarrinho = document.querySelector("#itens-carrinho");
const vazio = document.querySelector("#carrinho-vazio");
const resumo = document.querySelector("#resumo-carrinho");
const finalizarBotao = document.querySelector("#finalizar-pedido");
const limparBotao = document.querySelector("#limpar-carrinho");

function salvarCarrinho() {
    localStorage.setItem("carrinhoApexRide", JSON.stringify(carrinho));
}

function limparElementos(container) {
    while (container.firstChild) {
        container.firstChild.remove();
    }
}

function renderizarProdutos() {
    limparElementos(listaProdutos);

    produtosDisponiveis.forEach(produto => {
        const card = document.createElement("div");
        card.className = "item-card";

        const topo = document.createElement("div");
        topo.className = "item-top";

        const nome = document.createElement("strong");
        nome.textContent = produto.nome;

        const valor = document.createElement("span");
        valor.textContent = "R$ " + produto.preco;

        const botao = document.createElement("button");
        botao.className = "btn-adicionar";
        botao.textContent = "Adicionar";
        botao.onclick = function() {
            adicionarAoCarrinho(produto.id);
        };

        topo.appendChild(nome);
        topo.appendChild(valor);
        card.appendChild(topo);
        card.appendChild(botao);
        listaProdutos.appendChild(card);
    });
}

function renderizarCarrinho() {
    limparElementos(listaCarrinho);

    if (carrinho.length === 0) {
        vazio.style.display = "block";
        resumo.innerHTML = "";
        return;
    }

    vazio.style.display = "none";

    carrinho.forEach(item => {
        const card = document.createElement("div");
        card.className = "item-card";

        const topo = document.createElement("div");
        topo.className = "item-top";

        const nome = document.createElement("strong");
        nome.textContent = item.nome;

        const valor = document.createElement("span");
        valor.textContent = "R$ " + (item.preco * item.quantidade);

        const controles = document.createElement("div");
        controles.className = "quantidade-controls";

        const botaoMenos = document.createElement("button");
        botaoMenos.textContent = "-";
        botaoMenos.onclick = function() {
            diminuirQuantidade(item.id);
        };

        const quantidade = document.createElement("span");
        quantidade.textContent = item.quantidade;

        const botaoMais = document.createElement("button");
        botaoMais.textContent = "+";
        botaoMais.onclick = function() {
            aumentarQuantidade(item.id);
        };

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.className = "detalhes";
        botaoRemover.onclick = function() {
            removerDoCarrinho(item.id);
        };

        topo.appendChild(nome);
        topo.appendChild(valor);
        controles.appendChild(botaoMenos);
        controles.appendChild(quantidade);
        controles.appendChild(botaoMais);
        controles.appendChild(botaoRemover);
        card.appendChild(topo);
        card.appendChild(controles);
        listaCarrinho.appendChild(card);
    });

    let total = 0;
    let quantidadeTotal = 0;

    for (let i = 0; i < carrinho.length; i++) {
        total += carrinho[i].preco * carrinho[i].quantidade;
        quantidadeTotal += carrinho[i].quantidade;
    }

    resumo.innerHTML = `
        <h3>Resumo</h3>
        <p><strong>Quantidade total:</strong> ${quantidadeTotal}</p>
        <p><strong>Valor total:</strong> R$ ${total}</p>
    `;
}

function adicionarAoCarrinho(id) {
    const produto = produtosDisponiveis.find(item => item.id === id);

    if (produto) {
        const existente = carrinho.find(item => item.id === id);

        if (existente) {
            existente.quantidade += 1;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }

        salvarCarrinho();
        renderizarCarrinho();
    }
}

function aumentarQuantidade(id) {
    const item = carrinho.find(item => item.id === id);

    if (item) {
        item.quantidade += 1;
        salvarCarrinho();
        renderizarCarrinho();
    }
}

function diminuirQuantidade(id) {
    const item = carrinho.find(item => item.id === id);

    if (item && item.quantidade > 1) {
        item.quantidade -= 1;
        salvarCarrinho();
        renderizarCarrinho();
    }
}

function removerDoCarrinho(id) {
    let novoCarrinho = [];

    for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].id !== id) {
            novoCarrinho.push(carrinho[i]);
        }
    }

    carrinho = novoCarrinho;
    salvarCarrinho();
    renderizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    salvarCarrinho();
    renderizarCarrinho();
}

finalizarBotao.addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    alert("Pedido finalizado com sucesso!");
    limparCarrinho();
});

limparBotao.addEventListener("click", () => {
    limparCarrinho();
});

renderizarProdutos();
renderizarCarrinho();
