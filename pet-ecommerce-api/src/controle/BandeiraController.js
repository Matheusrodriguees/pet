import BandeiraDAO from '../dao/BandeiraDAO.js'

class BandeiraController {
    constructor() {}


    async listar() {
        const bandeiraDAO = new BandeiraDAO();
        return await bandeiraDAO.listar();
    }

    

}
export default BandeiraController