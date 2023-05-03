import express from "express";
import Fachada from "../controle/Fachada.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const fachada = new Fachada();
    let result = await fachada.listar("estoque");
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { estoque } = req.body;

  const fachada = new Fachada();

  fachada.editar(id, estoque, "estoque");

  return res.status(200).end();
});

export default router;
