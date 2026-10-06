function goTo(path) {
    {{ url_for(path) }}
}

function toggleModal(modal_Id){
  // div modal
  let modalParent = document.createElement('div');
  modalParent.className = "modal-parent"
  modalParent.id = modal_id;

  let modalContent = create_modal('addItem');

  modalParent.appendChild(modalContent);

}

function create_modal(type) {
    if (type == 'addItem') {
        let contentParent = document.createElement('div');
        contentParent.className = 'modal-content'; // repare: className, não classname

        contentParent.append(
            create_fielditem('create_titulo', 'Titulo:', 'iTitulo', 'titulo obra'),
            create_fielditem('create_autoria', 'Autoria:', 'iAutoria', 'autoria obra'),
            create_fielditem('create_editora', 'Editora:', 'iEditora', 'editora obra'),
            create_fielditem('create_generoLiterario', 'Genero Literario:', 'igenero', 'genero literario obra'),
            create_fielditem('create_isbn', 'ISBN:', 'iIsbn', 'isbn obra')
        );

        return contentParent;
    }
}

function create_fielditem(field_id, label_title, input_name, input_placeholder = '', input_type = 'text') {
    let field = document.createElement('div');
    field.className = 'fielditem';
    field.id = field_id;

    let label = document.createElement('label');
    label.textContent = label_title;
    label.htmlFor = input_name; // atenção: é "htmlFor", não "for"

    let input = document.createElement('input');
    input.type = input_type;
    input.name = input_name;
    input.placeholder = input_placeholder;

    field.appendChild(label);
    field.appendChild(input);

    return field;
}

// -------------------------

// // CRUD facil
// const CRUD = {
//   criar(nomeObjeto, dadoObjeto) {
//     localStorage.setItem(nomeObjeto, JSON.stringify(dadoObjeto));
//   },
//   recuperar(dadoObjeto) {
//     return JSON.parse(localStorage.getItem(dadoObjeto));
//   },
//   recuperar_listaChaves() {
//     return Object.keys(localStorage);
//   },
//   atualizar(nomeObjeto, constObjeto) {
//     localStorage.setItem(nomeObjeto, JSON.stringify(constObjeto));
//   },
//   deletar_item(dadoObjeto) {
//     let objeto = JSON.parse(localStorage.getItem(dadoObjeto));
//     // TODO: ARRUMAR ESSA FUNCAO
//     //objeto.splice(1, 1);
//     console.log("SIMULACAO: OBJETO DELETADO!");
//   },
//   deletar_tudo() {
//     localStorage.clear();
//   },
// };

// // COLECAO - CARREGAR ITENS PAGINA
// async function carregarItens(termo = "") {
//     const url = termo ? `/colecao?q=${encodeURIComponent(termo)}` : "/colecao";
//     const resposta = await fetch(url);
//     const itens = await resposta.json();
//
//     const lista = document.getElementById("div-itens");
//     lista.innerHTML = ""; // limpa SEMPRE antes de redesenhar — é isso que evita duplicação
//
//     itens.forEach(item => {
//         const li = document.createElement("li");
//         li.innerHTML = `<p>${item.item_nome}</p><p>${item.item_autoria}</p>`;
//         lista.appendChild(li);
//     });
// }
//
// // carga inicial
// carregarItens();
//
// // busca, ex: input com evento
// document.getElementById("campo-busca").addEventListener("input", (e) => {
//     carregarItens(e.target.value);
// });