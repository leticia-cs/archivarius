const API = "http://127.0.0.1:5000/api/itens";

async function req(url, method = "GET", body) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.status === 204 ? null : res.json();
}

// acessar facil com objeto
export const CRUD = {
  criar: (nome, autoria, tipo) =>
    req(API, "POST", { nome, autoria, tipo }).then(r => r.id),
  listar_tudo: () => req(API),
  buscar: (id) => req(`${API}/${id}`),
  atualizar: (id, nome, autoria, tipo) =>
    req(`${API}/${id}`, "PUT", { nome, autoria, tipo }),
  deletar_item: (id) => req(`${API}/${id}`, "DELETE"),
  deletar_tudo: () => req(API, "DELETE"),
};