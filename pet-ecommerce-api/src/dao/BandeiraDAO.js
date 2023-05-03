import CONFIG_BANCO from "../constant/CONFIG_BANCO.js";
import mysql from 'mysql2/promise'

class BandeiraDAO {
    async listar(){
        const conn =  await mysql.createConnection(CONFIG_BANCO);
        const [rows]  = await conn.execute(`SELECT * FROM BANDEIRAS`);
        console.log('listar', rows)
        return rows;
    }
}
export default BandeiraDAO 