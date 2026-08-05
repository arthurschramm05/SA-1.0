const servicos = [
    { id: 11, nome: "Manutenção preventiva", preco: 149 },
    { id: 12, nome: "Revisão", preco: 199 },
    { id: 13, nome: "Troca de bateria", preco: 899 },
    { id: 14, nome: "Atualização de software", preco: 89 },
    { id: 15, nome: "Assistência técnica", preco: 129 }
];

function adicionarServicoAoCarrinho(id) {
    const servico = servicos.find(item => item.id === id);
    const carrinho = JSON.parse(localStorage.getItem("carrinhoApexRide") || "[]");
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ ...servico, quantidade: 1 });
    }

    localStorage.setItem("carrinhoApexRide", JSON.stringify(carrinho));
    alert("Serviço adicionado ao carrinho!");
}

document.querySelectorAll(".produto .btn-agendar").forEach((botao, indice) => {
    botao.addEventListener("click", () => adicionarServicoAoCarrinho(servicos[indice].id));
});
