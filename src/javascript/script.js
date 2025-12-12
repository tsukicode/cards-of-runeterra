let listaDeCartas = [];
const secao = document.querySelector(".content-cards");
const campoDeEntrada = document.getElementById('input-search');

async function carregarCartas() {
    try {
        const resposta = await fetch('data/card.json');
        const cartas = await resposta.json();

        listaDeCartas = cartas;

        exibirCartas(cartas);

    } catch (erro) {
        console.error("Erro ao carregar cartas:", erro);
    }
}

function exibirCartas(lista) {

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

function pesquisarCarta() {
    const cartaDigitada = campoDeEntrada.value.trim();

    if (cartaDigitada === "") {
        secao.innerHTML = "";
        exibirCartas(listaDeCartas);
        return;
    };

    const listaFiltrada = listaDeCartas.filter(carta =>
        carta.name.toLowerCase().includes(cartaDigitada.toLowerCase())
    );


    secao.innerHTML = "";

    if (listaFiltrada.length === 0) {
        const p = document.createElement('p');
        p.textContent = "Carta não encontrada.";
        secao.appendChild(p);
    } else {
        exibirCartas(listaFiltrada);
    }
}

campoDeEntrada.addEventListener('input', pesquisarCarta);

carregarCartas();