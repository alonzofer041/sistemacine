const pool=require('../db');
class Asientos{
    constructor(){
        this.idasiento=0;
        this.idsala=0;
        this.nombre='';
        this.fila='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';

    }
    async insertar(){
        let respuesta=await pool.query('INSERT INTO asientos (idsala,nombre,fila,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?)',[
            this.idsala,
            this.nombre,
            this.fila,
            this.created_at,
            null,
            null
        ])
        return respuesta;
    }
    async actualizar(){
        let respuesta= await pool.query('UPDATE asientos SET nombre=?, fila=?, updated_at=? WHERE idasiento=?',[
            this.nombre,
            this.fila,
            this.updated_at,
            this.idasiento
        ]);
        return respuesta;
    }
    async eliminar(){
        let respuesta=await pool.query('UPDATE asientos SET deleted_at=? WHERE idasiento=?',[
            this.deleted_at,
            this.idasiento
        ]);
        return respuesta;
    }
    async listar(){
        const [rows]=await pool.execute('SELECT * FROM `asientos` WHERE `idsala`=? AND deleted_at IS NULL',[
            this.idsala,
        ]);
        return rows;
    }
    async ListarAsientosEntrada(){
        const [rows]=await pool.execute('SELECT * FROM asientos WHERE idsala=? AND deleted_at IS NULL',[
            this.idsala
        ]);
        return rows;
    }
}
module.exports=Asientos;