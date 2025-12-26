import { createServer } from "node:http";
import { routes } from "./router";

const server = createServer(async (req, res) => {
  // Condição para garantir que a requisição tenha url e method.
  if (!req.url || !req.method) {
    res.statusCode = 400;
    res.end("Requisição inválida");
    return;
  }

  // Criação da nossa URL.
  const url = new URL(req.url, "http://localhost:3000");

  // Primeiro o método, depois o caminho.
  const methodRoutes = routes[req.method];
  // Verificando se existe uma rota cadastrada para esse caminho.
  const route = methodRoutes?.[url.pathname];

  // Se não existir uma função para essa rota, retornamos 404.
  if (!route) {
    res.statusCode = 404;
    res.end("Rota não encontrada");
    return;
  }

  // Executa a função da rota, passando req e res.
  await route(req, res);
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
