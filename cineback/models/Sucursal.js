const pool=require('../db');
class Sucursal{
    constructor(){
        this.idsucursal=0;
        this.idempresa=0;
        this.nombre='';
        this.direccion='';
        this.telefono='';
        this.email='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';

    }
    async insertar(){
        const respuesta=await pool.query('INSERT INTO sucursal (idempresa,nombre,direccion,telefono,email,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?)',[
            this.idempresa,
            this.nombre,
            this.direccion,
            this.telefono,
            this.email,
            this.created_at,
            null,
            null
        ]);
        return respuesta
    }
    async actualizar(){
        const respuesta=await pool.query('UPDATE sucursal SET nombre=?, direccion=?, telefono=?, email=?, updated_at=? WHERE idsucursal=?',[
            this.nombre,
            this.direccion,
            this.telefono,
            this.email,
            this.updated_at,
            this.idsucursal
        ]);
        return respuesta;
    }
    async eliminar(){
        const respuesta=await pool.query('UPDATE sucursal SET deleted_at=? WHERE idsucursal=?',[
            this.deleted_at,
            this.idsucursal
        ]);
        return respuesta
    }
    async listar(){
        const [rows]=await pool.execute('SELECT * FROM `sucursal` WHERE `idempresa`=? AND deleted_at IS NULL',[
            this.idempresa
        ]);
        return rows;
    }
}
module.exports=Sucursal;