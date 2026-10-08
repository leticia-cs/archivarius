function goTo(path) {
    {{ url_for(path) }}
}

function toggleModal(modal_id) {
  // If the modal already exists, remove it (close)
  const existing = document.getElementById(modal_id);
  if (existing) {
    existing.remove();
    return;
  }

  const modalParent = document.createElement('div');
  modalParent.className = "modal-parent";
  modalParent.id = modal_id;

  const modalClose = document.createElement('button');
  modalClose.addEventListener('click', () => toggleModal(modal_id));
  modalClose.textContent = "X";

  const modalContent = create_modal('addItem', modal_id);
  modalParent.appendChild(modalContent);
  modalParent.appendChild(modalClose);
  document.body.appendChild(modalParent);
}

function create_modal(variant, modal_id) {
    if (variant === 'addItem') {
        let contentParent = document.createElement('div');
        contentParent.className = 'modal-content';

        contentParent.append(
            create_fielditem('iTitulo', 'Titulo:', 'iTitulo', 'titulo obra'),
            create_fielditem('iAutoria', 'Autoria:', 'iAutoria', 'autoria obra'),
            create_fielditem('iEditora', 'Editora:', 'iEditora', 'editora obra'),
            create_fielditem('iGenero', 'Genero Literario:', 'iGenero', 'genero literario obra'),
            create_fielditem('iIsbn', 'ISBN:', 'iIsbn', 'isbn obra')
        );
        // BOTOES MODAL
        const contentButtons = document.createElement('div');
        const modalCancel = document.createElement('button');
        modalCancel.addEventListener('click', () => toggleModal(modal_id));
        modalCancel.textContent = "cancelar";
        const modalSubmit = document.createElement('button');
        // TODO: CREATE
        modalSubmit.addEventListener('click', () => alert('debug: CRIADO!'));
        modalSubmit.textContent = "enviar";

        contentButtons.appendChild(modalCancel);
        contentButtons.appendChild(modalSubmit);
        contentParent.appendChild(contentButtons);

        return contentParent;
    }
}

function create_fielditem(field_id, label_title, input_name, input_placeholder = '', input_type = 'text') {
    let field = document.createElement('div');
    field.className = 'fielditem';
    field.id = field_id;

    let label = document.createElement('label');
    label.textContent = label_title;
    label.htmlFor = input_name;

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