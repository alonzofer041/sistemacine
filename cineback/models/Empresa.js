const pool=require('../db');
class Empresa{
    constructor(){
        this.idempresa=0;
        this.nombrecomercial='';
        this.razonsocial='';
        this.rfc='';
        this.direccion='';
        this.telefono='';
        this.email='';
        this.estado='';
        this.ciudad='';
        this.imgempresa='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
    }
    async insertar(){
        const respuesta=await pool.query('INSERT INTO empresa (nombrecomercial,razonsocial,rfc,direccion,telefono,email,estado,ciudad,imgempresa,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',[
            this.nombrecomercial,
            this.razonsocial,
            this.rfc,
            this.direccion,
            this.telefono,
            this.email,
            this.estado,
            this.ciudad,
            this.imgempresa,
            this.created_at,
            null,
            null
        ]);
        return respuesta;
    }
    async actualizar(){
        const respuesta=await pool.query('UPDATE empresa SET nombrecomercial=?, razonsocial=?, rfc=?, direccion=?, telefono=?, email=?, estado=?, ciudad=?, imgempresa=?, updated_at=? WHERE idempresa=?',[
            this.nombrecomercial,
            this.razonsocial,
            this.rfc,
            this.direccion,
            this.telefono,
            this.email,
            this.estado,
            this.ciudad,
            this.imgempresa,
            this.updated_at,
            this.idempresa
        ]);
        return respuesta;
    }
    async eliminar(res){
        const respuesta=await pool.query('UPDATE empresa SET deleted_at=? WHERE idempresa=?',[
            this.deleted_at,
            this.idempresa
        ]);
        return respuesta
    }
    async listar(){
        const [rows]=await pool.execute('SELECT * FROM `empresa` WHERE deleted_at IS NULL',[
        ])
        return rows;
    }
}
module.exports=Empresa