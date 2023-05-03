import express from 'express'
import CartaoDAO from '../dao/CartaoDAO.js'
import Fachada from '../controle/Fachada.js';
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
      const fachada = new Fachada();
      let result = await fachada.listar('cartao')
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });

  router.get("/bandeira", async (req, res, next) => {
    try {
      const fachada = new Fachada();
      let result = await fachada.listar('bandeira')
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
    let result = await fachada.inativar(id, 'inativar')
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})

router.post("/", async (req, res, next) => {
  try {
    const { cartao } = req.body;
    const fachada = new Fachada();
    let result = await fachada.cadastrar(cartao,'cartao')
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})

  
export default router;
