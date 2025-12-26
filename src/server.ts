import { createServer } from "node:http";

const server = createServer(async (req, res) => {
  if (!req.url) {
    res.statusCode = 400;
    res.end("URL inválida");
    return;
  }

  const url = new URL(req.url, "http://localhost:3000");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const cor = url.searchParams.get("cor");
  const tamanho = url.searchParams.get("tamanho");

  if (req.method === "GET" && url.pathname === "/") {
    res.statusCode = 200;
    // O Content-Type informa ao navegador qual é o tipo do conteúdo da resposta
    // e como ele deve interpretar esse conteúdo (HTML, JSON, texto etc).
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // .end é sempre o que vai ser enviado no fim, no caso esse html.
    // Importante, é apenas 1 end, ele não vai conseguir escrever o corpo novamente.
    res.end(`
      <html>
        <head>
          <body>
            <h1>Olá mundo</h1>
          </body>
        </head>
      </html>
      `);
  } else if (req.method === "POST" && url.pathname === "/produtos") {
    res.statusCode = 201;
    // setHeader porém com o conteúdo para um JSON.
    res.setHeader("Content-Type", "application/json");
    // O que vai ser enviado é um JSON com as propriedades de cor e tamanho.
    res.end(JSON.stringify({ cor, tamanho }));
  } else {
    res.statusCode = 404;
    res.end("Não encontrada.");
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
