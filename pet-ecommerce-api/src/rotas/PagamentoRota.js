import express from 'express'
import Fachada from "../controle/Fachada.js";

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const fachada = new Fachada();
    let result = await fachada.buscarId(id, 'pagamento')
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});


export default router;
