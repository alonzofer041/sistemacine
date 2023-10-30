const pool=require('../db');
class Salas{
    constructor(){
        this.idsala=0;
        this.idempresa=0;
        this.idsucursal=0;
        this.nombre='';
        this.ubicacion='';
        this.numfilas=0;
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';

    }
    async insertar(){
        let respuesta=await pool.query('INSERT INTO salas (idempresa,idsucursal,nombre, ubicacion, numfilas, created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?)',[
            this.idempresa,
            this.idsucursal,
            this.nombre,
            this.ubicacion,
            this.numfilas,
            this.created_at,
            null,
            null
        ])
        return respuesta;
    }
    async actualizar(){
        let respuesta=await pool.query('UPDATE salas SET nombre=?, ubicacion=?,numfilas=?, updated_at=? WHERE idsala=?',[
            this.nombre,
            this.ubicacion,
            this.numfilas,
            this.updated_at,
            this.idsala
        ])
        return respuesta;
    }
    async eliminar(){
        await pool.query('UPDATE salas SET deleted_at=? WHERE idsala=?',[
            this.deleted_at,
            this.idsala
        ])
        return respuesta;
    }
    async listar(){
        const [rows]=await pool.execute('SELECT * FROM `salas` WHERE `idempresa`=? AND `idsucursal`=? AND deleted_at IS NULL',[
            this.idempresa,
            this.idsucursal
        ]);
        return rows;
    }
}
module.exports=Salas;