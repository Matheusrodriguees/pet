import express from "express";
import Fachada from "../controle/Fachada.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { cliente } = req.body;
  try {
    const fachada = new Fachada();

    console.log("cliente", req.body);
    const result = await fachada.cadastrar(req.body, "cliente");
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

router.put("/:id", async (req, res, next) => {
  const { cliente } = req.body;
  const { id } = req.params;
  try {
    const fachada = new Fachada();
    const result = await fachada.editar(id, cliente, "cliente");
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const fachada = new Fachada();
    const result = await fachada.buscarId(id, "cliente");
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

router.get("/", async (req, res, next) => {
  try {
    const fachada = new Fachada();
    const result = await fachada.listar("cliente");
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

router.put("/inativar/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const fachada = new Fachada();
    const result = await fachada.inativar(id, "cliente");
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

export default router;
