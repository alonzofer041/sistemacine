const pool=require('../db');
class HorarioxAsiento{
    constructor(){
        this.idhorarioxasiento=0;
        this.idhorario=0;
        this.idasiento=0;
    }
    async insertar(){
        let respuesta=await pool.query('INSERT INTO horarioxasiento (idhorario,idasiento) VALUES (?,?)',[
            this.idhorario,
            this.idasiento
        ]);
        return respuesta;
    }
    async listar(){
        const [rows]=await pool.query('SELECT * FROM horarioxasiento WHERE idhorario=?',[
            this.idhorario
        ]);
        return rows;
    }
}
module.exports=HorarioxAsiento;