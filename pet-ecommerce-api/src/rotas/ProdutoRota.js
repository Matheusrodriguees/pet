import express from 'express'
import Fachada from "../controle/Fachada.js";
import ProdutoDAO from "../dao/ProdutoDAO.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const fachada = new Fachada();
        let result = await fachada.listar('produto')
        res.status(200).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

router.get("/resumo-vendas", async (req, res, next) => {
    try {
        const {produtos,inicio,fim} = req.query;
        const fachada = new Fachada();
        let result = await fachada.obterResumoVendas(produtos, new Date(inicio), new Date(fim))
        res.status(200).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

router.post("/", async (req, res, next) => {
    try {
        const fachada = new Fachada();
        let result = await fachada.cadastrar(req.body,'produto')
        res.status(201).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});


export default router;
