const pool=require('../db');
class Banner{
    constructor(){
        this.idbanner=0;
        this.idempresa=0;
        this.idsucursal=0;
        this.imgbanner='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
    }
    async insertar(){
        let respuesta=await pool.query('INSERT INTO banners (idempresa,idsucursal,imgbanner,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?)',[
            this.idempresa,
            this.idsucursal,
            this.imgbanner,
            this.created_at,
            null,
            null
        ]);
        return respuesta;
    }
    async actualizar(){
        let respuesta=await pool.query('UPDATE banners SET imgbanner=? ,updated_at=? WHERE idbanner=?',[
            this.imgbanner,
            this.updated_at,
            this.idbanner
        ]);
        return respuesta;
    }
    async eliminar(){
        let respuesta=await pool.query('UPDATE banners SET deleted_at=? WHERE idbanner=?',[
            this.deleted_at,
            this.idbanner
        ]);
        return respuesta;
    }
    async listar(){
        const [rows]=await pool.execute('SELECT * FROM `banners` WHERE `idempresa`=? AND `idsucursal`=? AND deleted_at IS NULL',[
            this.idempresa,
            this.idsucursal
        ])
        return rows;
    }
}
module.exports=Banner