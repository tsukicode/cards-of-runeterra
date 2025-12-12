let listaDeCartas = [];
const secao = document.querySelector(".content-cards");
const campoDeEntrada = document.getElementById('input-search');
const botoesFiltro = document.querySelectorAll('.filter-btn');

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
    secao.innerHTML = "";

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

    exibirResultado(listaFiltrada);
}

function filtrarPorRegiao(regiao) {
    if (regiao === "all") {
        exibirCartas(listaDeCartas);
        return;
    }

    const listaFiltrada = listaDeCartas.filter(carta =>
        carta.regionRef && carta.regionRef.toLowerCase() === regiao
    );

    exibirResultado(listaFiltrada);
}

function exibirResultado(lista) {
    if (lista.length === 0) {
        secao.innerHTML = "Nenhuma carta encontrada.";
        return;
    }

    exibirCartas(lista);
}

campoDeEntrada.addEventListener('input', pesquisarCarta);

botoesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
        const regiao = btn.dataset.region;
        filtrarPorRegiao(regiao);
        campoDeEntrada.value = "";
    });
});

carregarCartas();