const pool=require('../db');
class Proveedor{
    constructor(){
        this.idproveedor=0;
        this.idempresa=0;
        this.idsucursal=0;
        this.nombrecomercial='';
        this.razonsocial='';
        this.email='';
        this.contacto= '';
        this.telefono= '';
        this.direccion='';
        this.estado='';
        this.ciudad='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';

    }
    async insertar(){
        let respuesta=await pool.query('INSERT INTO proveedores (idproveedor,idempresa,idsucursal,nombrecomercial,razonsocial,email,contacto,telefono,direccion,estado,ciudad,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[
            this.idproveedor,
            this.idempresa,
            this.idsucursal,
            this.nombrecomercial,
            this.razonsocial,
            this.email,
            this.contacto,
            this.telefono,
            this.direccion,
            this.estado,
            this.ciudad,
            this.created_at,
            null,
            null
        ]);
        return respuesta;
    }
    async actualizar(){
        let respuesta=await pool.query('UPDATE proveedores SET nombrecomercial=? ,razonsocial=?, email=?, contacto=?, telefono=? , direccion=?, estado=?, ciudad=?, updated_at=? WHERE idproveedor=?',[
            this.nombrecomercial,
            this.razonsocial,
            this.email,
            this.contacto,
            this.telefono,
            this.direccion,
            this.estado,
            this.ciudad,
            this.updated_at,
            this.idproveedor
        ]);
        return respuesta;
    }
    async eliminar(){
        let respuesta=await pool.query('UPDATE proveedores SET deleted_at=? WHERE idproveedor=?',[
            this.deleted_at,
            this.idproveedor
        ]);
        return respuesta;
    }
    async listar(res){
        const [rows]=await pool.execute('SELECT * FROM `proveedores` WHERE `idempresa`=? AND `idsucursal`=? AND deleted_at IS NULL',[
            this.idempresa,
            this.idsucursal
        ])
        return rows;
    }
}

module.exports=Proveedor;