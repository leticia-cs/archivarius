function goTo(path) {
    {{ url_for(path) }}
}

// CRUD facil
const CRUD = {
  criar(nomeObjeto, dadoObjeto) {
    localStorage.setItem(nomeObjeto, JSON.stringify(dadoObjeto));
  },
  recuperar(dadoObjeto) {
    return JSON.parse(localStorage.getItem(dadoObjeto));
  },
  recuperar_listaChaves() {
    return Object.keys(localStorage);
  },
  atualizar(nomeObjeto, constObjeto) {
    localStorage.setItem(nomeObjeto, JSON.stringify(constObjeto));
  },
  deletar_item(dadoObjeto) {
    let objeto = JSON.parse(localStorage.getItem(dadoObjeto));
    // TODO: ARRUMAR ESSA FUNCAO
    //objeto.splice(1, 1);
    console.log("SIMULACAO: OBJETO DELETADO!");
  },
  deletar_tudo() {
    localStorage.clear();
  },
};

// COLECAO - CARREGAR ITENS PAGINA
async function carregarItens(termo = "") {
    const url = termo ? `/colecao?q=${encodeURIComponent(termo)}` : "/colecao";
    const resposta = await fetch(url);
    const itens = await resposta.json();

    const lista = document.getElementById("div-itens");
    lista.innerHTML = ""; // limpa SEMPRE antes de redesenhar — é isso que evita duplicação

    itens.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<p>${item.item_nome}</p><p>${item.item_autoria}</p>`;
        lista.appendChild(li);
    });
}

// carga inicial
carregarItens();

// busca, ex: input com evento
document.getElementById("campo-busca").addEventListener("input", (e) => {
    carregarItens(e.target.value);
});