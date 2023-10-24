const pool=require('../db');
class Usuario{
    constructor(){
        this.idusuario=0;
        this.nombre='';
        this.correo='';
        this.password='';
        this.token='';
        this.idempresa='';
        this.idsucursal='';
        this.rol='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
    }
    async login(res){
        const [rows]=await pool.query('SELECT * FROM usuario WHERE correo=? AND password=? AND deleted_at IS NULL',[
            this.correo,
            this.password,
        ])
        return rows;
    }
}
module.exports=Usuario;