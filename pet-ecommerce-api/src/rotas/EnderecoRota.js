import express from 'express'
import Fachada from '../controle/Fachada.js';

const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      const fachada = new Fachada();
      let result = await fachada.listar('endereco')
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const { endereco } = req.body;
      const fachada = new Fachada();
      let result = await fachada.cadastrar(endereco,'endereco')
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });

  router.put("/inativar/", async (req, res, next) => {
    try {
      const { id } = req.body;
      const fachada = new Fachada();
      const result = await fachada.inativar(id, 'endereco')
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  })
  

  
export default router;
