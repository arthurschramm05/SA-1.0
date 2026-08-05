const acessorios = [
    { id: 5, nome: 'Capacete', preco: 189, imagem: 'img/produtos/Capacete.jpg' },
    { id: 6, nome: 'Baú', preco: 299, imagem: 'img/produtos/bau.jpg' },
    { id: 7, nome: 'Cesta', preco: 129, imagem: 'img/produtos/cesta.jpg' },
    { id: 8, nome: 'Suporte para celular', preco: 79, imagem: 'img/produtos/suporte.jpg' },
    { id: 9, nome: 'Retrovisor', preco: 99, imagem: 'img/produtos/retrovisor.jpg' },
    { id: 10, nome: 'Bagageiro', preco: 249, imagem: 'img/produtos/Bagageiro.jpg' }
];

let listaAcessorios = acessorios;

function criarAcessorio(acessorio) {
    const card = document.createElement('div');
    card.className = 'produto';

    card.innerHTML = `
        <img src="${acessorio.imagem}" alt="${acessorio.nome}">
        <h2>${acessorio.nome}</h2>
        <h3>R$ ${acessorio.preco}</h3>
        <div class="botoes">
            <button class="btn-comprar" type="button">Comprar</button>
        </div>
    `;

    card.querySelector('.btn-comprar').addEventListener('click', function () {
        adicionarAcessorioAoCarrinho(acessorio.id);
    });

    return card;
}

function mostrarAcessorios() {
    const area = document.getElementById('lista-acessorios');
    if (!area) return;

    area.innerHTML = '';

    listaAcessorios.forEach(function (acessorio) {
        area.appendChild(criarAcessorio(acessorio));
    });
}

function adicionarAcessorioAoCarrinho(id) {
    const carrinho = JSON.parse(localStorage.getItem('carrinhoApexRide') || '[]');

    const acessorio = acessorios.find(function (item) {
        return item.id === id;
    });

    const itemExistente = carrinho.find(function (item) {
        return item.id === id;
    });

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ ...acessorio, quantidade: 1 });
    }

    localStorage.setItem('carrinhoApexRide', JSON.stringify(carrinho));
    alert('Acessório adicionado ao carrinho!');
}

const buscarAcessorio = document.getElementById("buscar-acessorios");
const ordenarAcessorio = document.getElementById("ordenar-acessorios");


buscarAcessorio.addEventListener("input", function () {

    buscarAcessorios(buscarAcessorio.value);

});


ordenarAcessorio.addEventListener("change", function () {

    const opcao = ordenarAcessorio.value;


    if (opcao === "preco") {

        listaAcessorios = [...acessorios];

        listaAcessorios.sort(function (a, b) {
            return a.preco - b.preco;
        });

        mostrarAcessorios();

    }


});


ordenarAcessorio.addEventListener("change", function () {

    const opcao = ordenarAcessorio.value;


    if (opcao === "nome") {

        listaAcessorios = [...acessorios];

        listaAcessorios.sort(function (a, b) {
            return a.nome.localeCompare(b.nome);
        });

        mostrarAcessorios();

    }
});

function buscarAcessorios(texto) {

    listaAcessorios = acessorios.filter(function (acessorio) {

        return acessorio.nome.includes(texto);

    });

    mostrarAcessorios();

}


const campoBuscaAcessorio = document.getElementById("buscar-acessorios");

campoBuscaAcessorio.addEventListener("input", function () {

    buscarAcessorios(campoBuscaAcessorio.value);

});

mostrarAcessorios();