async function carregarCartas() {
    try {
        const resposta = await fetch('data/cards.json');
        const cartas = await resposta.json();


        console.log(cartas);


        exibirCartas(cartas);


    } catch (erro) {
        console.error("Erro ao carregar cartas:", erro);
    }
}


function exibirCartas(lista) {
    const secao = document.querySelector(".content-cards")


    lista.forEach(carta => {
        const div = document.createElement("div");
        div.classList.add("card");


        const img = document.createElement("img");
        img.src = `https://lorassets.switchblade.xyz/pt_br/img/cards/${carta.cardCode}.png`;


        const nome = document.createElement("h3");
        nome.textContent = carta.name;


        div.appendChild(img);
        div.appendChild(nome);
        secao.appendChild(div);
    });
}


carregarCartas();