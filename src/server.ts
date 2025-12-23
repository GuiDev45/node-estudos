// Importa a função responsável por criar um servidor HTTP no Node
import { createServer } from "node:http";

// Cria o servidor e define um callback que será executado
// toda vez que uma requisição HTTP chegar
const server = createServer((request, response) => {
  // Define o tipo de conteúdo da resposta como texto UTF-8
  response.setHeader("Content-Type", "text/plain; charset=utf-8");

  // Se a requisição for GET na rota "/"
  if (request.method === "GET" && request.url === "/") {
    response.statusCode = 200;
    response.end("Home.");

    // Se a requisição for POST na rota "/produto"
  } else if (request.method === "POST" && request.url === "/produto") {
    response.statusCode = 201;
    response.end("Produto criado.");

    // Qualquer outra rota retorna 404
  } else {
    response.statusCode = 404;
    response.end("Não encontrada.");
  }
});

// Inicia o servidor e faz ele escutar conexões na porta 3000
server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
