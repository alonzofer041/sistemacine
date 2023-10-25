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
    async insertar(){
        const respuesta=await pool.query('INSERT INTO usuario (nombre,correo,password,idempresa,idsucursal,rol,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?,?)',[
            this.nombre,
            this.correo,
            this.password,
            this.idempresa,
            this.idsucursal,
            this.rol,
            this.created_at,
            null,
            null
        ]);
        return respuesta;
    }
    async actualizar(){
        const respuesta=await pool.query('UPDATE usuario SET nombre=?, correo=?, email=?, password=?, updated_at=? WHERE idusuario=?',[
            this.nombre,
            this.correo,
            this.password,
            this.updated_at,
            this.idusuario
        ])
        return respuesta;
    }
    async eliminar(){
        const respuesta=await pool.query('UPDATE usuario SET deleted_at=? WHERE idusuario=?',[
            this.deleted_at,
            this.idusuario
        ]);
        return respuesta;
    }
    async listar(){
        const [rows]=await pool.query('SELECT * FROM usuario WHERE idempresa=? AND idsucursal=? AND deleted_at IS NULL',[
            this.idempresa,
            this.idsucursal
        ]);
        return rows;
    }
}
module.exports=Usuario;