const pool=require('../db');
class CombosDetalle{
    constructor(){
        this.idcombodetalle=0;
        this.idcombo=0;
        this.idproducto=0;
        this.cantidad='';
        this.valor='';
        this.nombre='',
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
    }
    async insertar(){
        let respuesta=await pool.query('INSERT INTO combosdetalle (idcombo,idproducto,cantidad,valor,nombre,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?)',[
            this.idcombo,
            this.idproducto,
            this.cantidad,
            this.valor,
            this.nombre,
            this.created_at,
            null,
            null
        ]);
        return respuesta;
    }
    async actualizar(){
        let respuesta=await pool.query('UPDATE combosdetalle SET idcombo=?,idproducto=?,cantidad=?,valor=?,nombre=?,updated_at=? WHERE idcombodetalle=?',[
            this.idcombo,
            this.idproducto,
            this.cantidad,
            this.valor,
            this.nombre,
            this.updated_at,
            this.idcombodetalle,
        ]);
        return respuesta
    }
    async eliminar(){
        let respuesta=await pool.query('UPDATE combosdetalle SET deleted_at=? WHERE idcombodetalle=?',[
            this.deleted_at,
            this.idcombodetalle
        ]);
        return respuesta
    }
    async listar(){
        const [rows]=await pool.execute('SELECT * FROM `combosdetalle` WHERE `idcombo`=?  AND deleted_at IS NULL',[
            this.idcombo,
        ]);
        return rows;
    }
}
module.exports=CombosDetalle