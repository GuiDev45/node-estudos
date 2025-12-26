import { IncomingMessage, ServerResponse } from "node:http";

// Tipo para a função que vai ser executada/Handler
type RouteHandler = (
  req: IncomingMessage,
  res: ServerResponse,
) => void | Promise<void>;

// Tipo da rota vai ser o método e o caminho/path
type Routes = {
  [method: string]: {
    [path: string]: RouteHandler;
  };
};

// Organização de rotas
export const routes: Routes = {
  // Objeto do GET
  GET: {
    // O caminho "/" não utiliza dados da requisição, apenas envia uma resposta.
    "/": (req, res) => {
      res.statusCode = 200;
      res.end("Home"); // É o que vai ser enviado no corpo
    },

    // "/produtos" é o caminho, não utiliza dados da requisição, apenas envia uma resposta.
    "/produtos": (req, res) => {
      res.statusCode = 200;
      res.end("Produtos - Notebook"); // É o que vai ser enviado no corpo
    },
  },

  // Objeto de POST
  POST: {
    // "/produtos" é o caminho, não utiliza dados da requisição, apenas envia uma resposta.
    "/produtos": async (req, res) => {
      res.statusCode = 201;
      res.end("Produto criado"); // É o que vai ser enviado no corpo
    },
  },
};
