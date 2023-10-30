const pool=require('../db');
class Combo{
    constructor(){
        this.idcombo=0;
        this.idempresa=0;
        this.idsucursal=0;
        this.nombre='';
        this.valor='';
        this.imgcombo='',
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
    }
    async insertar(){
        let respuesta=await pool.query('INSERT INTO combos (idempresa,idsucursal,nombre,valor,imgcombo,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?)',[
            this.idempresa,
            this.idsucursal,
            this.nombre,
            this.valor,
            this.imgcombo,
            this.created_at,
            null,
            null
        ]);
        return respuesta;
    }
    async actualizar(){
        let respuesta=await pool.query('UPDATE combos SET nombre=?,valor=?,imgcombo=?,updated_at=? WHERE idcombo=?',[
            this.nombre,
            this.valor,
            this.imgcombo,
            this.updated_at,
            this.idcombo,
        ]);
        return respuesta;
    }
    async eliminar(){
        let respuesta=await pool.query('UPDATE combos SET deleted_at=? WHERE idcombo=?',[
            this.deleted_at,
            this.idcombo
        ]);
        return respuesta;
    }
    async listar(){
        const [rows]=await pool.execute('SELECT * FROM `combos` WHERE `idempresa`=? AND `idsucursal`=? AND deleted_at IS NULL',[
            this.idempresa,
            this.idsucursal
        ]);
        return rows;
    }
}
module.exports=Combo