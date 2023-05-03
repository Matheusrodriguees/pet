import express from 'express'
import Fachada from "../controle/Fachada.js";

const router = express.Router();

router.get("/cliente/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cupom = new Fachada();
    let result = await cupom.listarPorCliente(id,'cupom')
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

router.get("/", async (req, res, next) => {
  try {
    const cupom = new Fachada();
    let result = await cupom.listar('cupom')
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { cupom } = req.body;
    const cupomControle = new Fachada();
    const result = await cupomControle.cadastrar(cupom,'cupom')
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { cupom } = req.body;
    const cupomControle = new Fachada();
    const result = await cupomControle.editar(cupom.codigo,cupom,'cupom')
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
   
    const cupomControle = new Fachada();
    const result = await cupomControle.inativar(id,'cupom')
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});



export default router;
