const pool=require('../db');
class Empresa{
    constructor(){
        this.idempresa=0;
        this.imgbanner='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
    }
    insertar(res){
        pool.query('INSERT INTO banners (idempresa,idsucursal,imgbanner,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?)',[
            this.idempresa,
            this.idsucursal,
            this.imgbanner,
            this.created_at,
            null,
            null
        ],function(err,results,fields){
            console.log(err);
            res.json(results);
        })
    }
    actualizar(res){
        pool.query('UPDATE banners SET imgbanner=? ,updated_at=? WHERE idbanner=?',[
            this.imgbanner,
            this.updated_at,
            this.idbanner
        ],function(err,results,fields){
            // console.log(err);
            res.json(results);
        })
    }
    eliminar(res){
        pool.query('UPDATE banners SET deleted_at=? WHERE idbanner=?',[
            this.deleted_at,
            this.idbanner
        ],function(err,results,fields){
            res.json(results);
        })
    }
    async listar(){
        const [rows]=await pool.execute('SELECT * FROM `banners` WHERE `idempresa`=? AND `idsucursal`=? AND deleted_at IS NULL',[
            this.idempresa,
            this.idsucursal
        ])
        return rows;
    }
}
module.exports=Empresa