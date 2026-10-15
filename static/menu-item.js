// Menu de ações de cada item (⋮ → Editar item / Deletar)

(function () {
  const SELETOR_MENU = ".menu-item";
  const SELETOR_GATILHO = ".item__gatilho";

  function fecharTodos() {
    document.querySelectorAll(SELETOR_MENU + ":not([hidden])").forEach(function (menu) {
      menu.hidden = true;
      const gatilho = menu.previousElementSibling;
      if (gatilho) gatilho.setAttribute("aria-expanded", "false");
    });
  }

  // Se o menu ultrapassar o fim da lista, abre para cima
  function posicionar(menu) {
    menu.classList.remove("menu-item--acima");
    const lista = menu.closest(".lista");
    if (!lista) return;
    const limite = lista.getBoundingClientRect().bottom;
    if (menu.getBoundingClientRect().bottom > limite) {
      menu.classList.add("menu-item--acima");
    }
  }

  document.addEventListener("click", function (e) {
    const gatilho = e.target.closest(SELETOR_GATILHO);

    // clique em uma ação do menu: fecha o menu
    // (a ação em si pode ser tratada por quem escutar o data-acao / data-id)
    if (e.target.closest(SELETOR_MENU)) {
      fecharTodos();
      return;
    }

    // clique fora: fecha tudo
    if (!gatilho) {
      fecharTodos();
      return;
    }

    // clique nos três pontos: alterna o menu daquele item
    const menu = gatilho.nextElementSibling;
    const estavaAberto = !menu.hidden;
    fecharTodos();

    if (!estavaAberto) {
      menu.hidden = false;
      gatilho.setAttribute("aria-expanded", "true");
      posicionar(menu);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    const aberto = document.querySelector(SELETOR_MENU + ":not([hidden])");
    if (!aberto) return;
    const gatilho = aberto.previousElementSibling;
    fecharTodos();
    if (gatilho) gatilho.focus();
  });
})();