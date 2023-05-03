import express from "express";
import morgan from "morgan";
import cors from "cors";
import clienteRota from "./src/rotas/ClienteRota.js";
import enderecoRota from "./src/rotas/EnderecoRota.js";
import cartaoRota from "./src/rotas/CartaoRota.js";
import produtoRota from "./src/rotas/ProdutoRota.js";
import pedidoRota from "./src/rotas/PedidoRota.js";
import cupomRota from "./src/rotas/CupomRota.js";
import produtoCategoriaRota from "./src/rotas/ProdutoCategoriaRota.js";
import freteRota from "./src/rotas/FreteRota.js";
import pagamentoRota from "./src/rotas/PagamentoRota.js";
import estoqueRota from "./src/rotas/EstoqueRota.js";
import precificacaoRota from "./src/rotas/PrecificacaoRota.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const DEFAULT_ROUTE = "/pet";

app.use(`${DEFAULT_ROUTE}/cliente`, clienteRota);
app.use(`${DEFAULT_ROUTE}/endereco`, enderecoRota);
app.use(`${DEFAULT_ROUTE}/cartao`, cartaoRota);
app.use(`${DEFAULT_ROUTE}/produto`, produtoRota);
app.use(`${DEFAULT_ROUTE}/produto/categoria`, produtoCategoriaRota);
app.use(`${DEFAULT_ROUTE}/pedido`, pedidoRota);
app.use(`${DEFAULT_ROUTE}/cupom`, cupomRota);
app.use(`${DEFAULT_ROUTE}/frete`, freteRota);
app.use(`${DEFAULT_ROUTE}/pagamento`, pagamentoRota);
app.use(`${DEFAULT_ROUTE}/estoque`, estoqueRota);
app.use(`${DEFAULT_ROUTE}/precificacao`, precificacaoRota);

export default app;
