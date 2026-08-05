const produtos = [
    { id: 1, nome: 'Scooter X11', preco: 8999, imagem: 'img/produtos/Scooter X11.png' },
    { id: 2, nome: 'Tricicúlo X15 3000W', preco: 10999, imagem: 'img/produtos/TRICICLO-PRETO.webp' },
    { id: 3, nome: 'Scooter MIA 1000W', preco: 6999, imagem: 'img/produtos/Scooter MIA 1000W.webp' },
    { id: 4, nome: 'Scooter Elétrica 3000W VTX', preco: 14999, imagem: 'img/produtos/Scooter Elétrica 3000W VTX.webp' }
];

let listaProdutos = produtos;

function criarProduto(produto) {
    const card = document.createElement('div');
    card.className = 'produto';
    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h2>${produto.nome}</h2>
        <h3>R$ ${produto.preco}</h3>
        <div class="botoes">
            <button class="btn-comprar" type="button">Comprar</button>
            <button class="detalhes" type="button">Detalhes</button>
        </div>
    `;

    card.querySelector('.btn-comprar').addEventListener('click', function () {
        adicionarAoCarrinho(produto.id);
    });

    return card;
}

function mostrarProdutos() {
    const area = document.getElementById('lista-produtos');
    if (!area) return;

    area.innerHTML = '';
    listaProdutos.forEach(function (produto) {
        area.appendChild(criarProduto(produto));
    });
}

function adicionarAoCarrinho(id) {
    const carrinho = JSON.parse(localStorage.getItem('carrinhoApexRide') || '[]');
    const produto = produtos.find(function (item) {
        return item.id === id;
    });

    const itemExistente = carrinho.find(function (item) {
        return item.id === id;
    });

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem('carrinhoApexRide', JSON.stringify(carrinho));
    alert('Produto adicionado ao carrinho!');
}

const ordenarProdutos = document.getElementById("ordenar-produtos");

ordenarProdutos.addEventListener("change", function () {

    const opcao = ordenarProdutos.value;

    if (opcao === "preco") {
        listaProdutos = [...produtos];
        listaProdutos.sort(function (a, b) {
            return a.preco - b.preco;
        });
        mostrarProdutos();
    }
});

ordenarProdutos.addEventListener("change", function () {

    const opcao = ordenarProdutos.value;

    if (opcao === "nome") {
        listaProdutos = [...produtos];

        listaProdutos.sort(function (a, b) {
            return a.nome.localeCompare(b.nome);
        });
        mostrarProdutos();
    }
});

function buscarProdutos(texto) {

    listaProdutos = produtos.filter(function (produto) {

        return produto.nome.includes(texto);

    });

    mostrarProdutos();

}

const campoBuscaProduto = document.getElementById("buscar-produtos");

campoBuscaProduto.addEventListener("input", function () {

    buscarProdutos(campoBuscaProduto.value);

});

mostrarProdutos();
mostrarProdutos();
