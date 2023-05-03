import FreteDAO from "../dao/FreteDAO.js";

class FreteController {
    constructor() { }

    async listar() {
        const freteDAO = new FreteDAO();
        return await freteDAO.listar();
    }


}
export default FreteController