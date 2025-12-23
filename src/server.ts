import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  // Como a url pode ser undefined, é passado esse if para o type não reclamar.
  // req.url só será undefined em cenários muito raros.
  if (!req.url) {
    res.statusCode = 400;
    res.end("URL inválida");
    return;
  }

  // new URL() transforma a string em um objeto URL, que facilita acessar partes da URL (pathname, searchParams, protocol, etc.)
  // http://localhost:3000 é o base URL, necessário quando a string do request é relativa (como /produtos?cor=azul).
  const url = new URL(req.url, "http://localhost:3000");
  console.log(url);

  // req.headers é um objeto JavaScript normal com todos os headers da requisição
  // Importante para autenticação, cache, content-type etc.
  console.log(req.headers);

  // Puxando uma propriedade da url, no caso a cor e tamanho
  const cor = url.searchParams.get("cor");
  const tamanho = url.searchParams.get("tamanho");

  // Agora comparamos com a url.pathname
  // OBS: Em um POST real, dados normalmente vêm no body, não na query string.
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
