import express from "express";
import Fachada from "../controle/Fachada.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { pedido } = req.body;
  try {
    const fachada = new Fachada();
    const result = await fachada.cadastrar(pedido, "pedido");
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

router.get("/", async (req, res, next) => {
  try {
    const fachada = new Fachada();
    const result = await fachada.listar("pedido");

    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { pedido } = req.body;
  const { item } = req.body;
  const { cupom } = req.body;
  const fachada = new Fachada();

  const cupomControle = new Fachada();

  try {
    if (cupom) {
      await cupomControle.cadastrar(cupom, "cupom");
    }
  } catch (error) {
  } finally {
    // const status = await fachada.buscarPorNome(pedido.status, "status");
    const status = await fachada.buscarPorNome(pedido.status, "status");

    const dados = {
      status: status[0].id,
      item_id: item?.item_id ||null,
      cupom_codigo: cupom?.codigo ||null,
    };

    console.log("dados", dados);
    await fachada.editar(id, dados, "pedido");
  }

  return res.status(200).end();
});

router.patch("/atualiza-cria-cupom/:id", async (req, res, next) => {
  const { id } = req.params;
  const { pedido } = req.body;
  const { item } = req.body;
  const { cupom } = req.body;
  const fachada = new Fachada();

  console.log("cupom", req.body);

  const cupomControle = new Fachada();

  try {
    if (cupom) {
      await cupomControle.cadastrar(cupom, "cupom");
    }
  } catch (error) {
  } finally {
    // const status = await fachada.buscarPorNome(pedido.status, "status");
    const status = await fachada.buscarPorNome(item.status, "status");

    const dados = {
      status: status[0].id,
      item_id: item.item_id,
    };

    console.log("dados", dados);
    await fachada.editar(id, dados, "pedido");
  }

  return res.status(200).end();
});

export default router;
