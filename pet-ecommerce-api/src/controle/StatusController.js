import StatusDAO from '../dao/StatusDAO.js'

class StatusController {
    constructor() { }

    async buscarPorNome(nome) {
        const statusDAO = new StatusDAO();
        const status = await statusDAO.buscarPorNome(nome);
        return status;
    }


}
export default StatusController