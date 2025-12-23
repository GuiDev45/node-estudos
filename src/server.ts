import { createServer } from "node:http";

// Como temos um await, a função precisa ser assincrona / async
const server = createServer(async (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  if (!req.url) {
    res.statusCode = 400;
    res.end("URL inválida");
    return;
  }

  const url = new URL(req.url, "http://localhost:3000");

  // Array de Buffers
  const chunks = [];
  // Loop simples para pegar cada parte desses Buffers
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  // O body chega como buffers, que são bytes. Primeiro convertemos para string e depois fazemos o parse para JSON.
  const body = Buffer.concat(chunks).toString("utf-8");
  console.log(JSON.parse(body));

  const cor = url.searchParams.get("cor");
  const tamanho = url.searchParams.get("tamanho");

  if (req.method === "GET" && url.pathname === "/") {
    res.statusCode = 200;
    res.end("Home.");
  } else if (req.method === "POST" && url.pathname === "/produtos") {
    res.statusCode = 201;
    res.end(`Produtos: ${cor}, ${tamanho}`);
  } else {
    res.statusCode = 404;
    res.end("Não encontrada.");
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
