import PrecificacaoDAO from '../dao/PrecificacaoDAO.js'

class PrecificacaoController {
    constructor() { }

    async listar() {
        const precificacaoDAO = new PrecificacaoDAO();
        return await precificacaoDAO.listar();
    }


}
export default PrecificacaoController