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