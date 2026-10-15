// MODAL COM  <dialog>
//   <button data-abrir-modal="idDoModal">  abre
//     data-modal-titulo="..."   (opcional) muda o título do modal (leitores de tela)
//     data-modal-action="..."   (opcional) muda a rota de envio do formulário
//   <button data-fechar-modal>             fecha o modal em que está
// ESC fecha automatico

(function () {
  function abrirModal(gatilho) {
    const modal = document.getElementById(gatilho.dataset.abrirModal);
    if (!modal || modal.open) return;

    const form = modal.querySelector("form");
    const titulo = modal.querySelector(".modal__titulo");

    if (gatilho.dataset.modalTitulo && titulo) {
      titulo.textContent = gatilho.dataset.modalTitulo;
    }
    if (gatilho.dataset.modalAction && form) {
      form.action = gatilho.dataset.modalAction;
    }

    // ao adicionar um item novo, o formulário começa vazio
    if (form && gatilho.dataset.modalTitulo === "Adicionar item") {
      form.reset();
    }

    modal.showModal();
  }

  document.addEventListener("click", function (e) {
    const abrir = e.target.closest("[data-abrir-modal]");
    if (abrir) {
      abrirModal(abrir);
      return;
    }

    const fechar = e.target.closest("[data-fechar-modal]");
    if (fechar) {
      const modal = fechar.closest("dialog");
      if (modal) modal.close();
      return;
    }
  });
})();