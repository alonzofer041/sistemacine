const pool=require('../db');
class HorarioPelicula{
    constructor(){
        this.idhorariopelicula=0;
        this.idsala=0;
        this.idpelicula=0;
        this.hora='',
        this.fecha='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
        this.FechaFiltro='';
        this.HoraFiltro='';
    }
    async insertar(){
        let respuesta=await pool.query('INSERT INTO horariospelicula (idpelicula,idsala,hora,fecha,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?)',[
            this.idpelicula,
            this.idsala,
            this.hora,
            this.fecha,
            this.created_at,
            null,
            null
        ]);
        return respuesta;
    }
    async actualizar(){
        let respuesta=await pool.query('UPDATE horariospelicula SET idsala=?,hora=?,fecha=?,updated_at=? WHERE idhorariopelicula=?',[
            this.idsala,
            this.hora,
            this.fecha,
            this.updated_at,
            this.idhorariopelicula,
        ]);
        return respuesta;
    }
    async eliminar(){
        let respuesta=await pool.query('UPDATE horariospelicula SET deleted_at=? WHERE idhorariopelicula=?',[
            this.deleted_at,
            this.idhorariopelicula
        ]);
        return respuesta;
    }
    async listar(){
        const [rows]=await pool.execute('SELECT * FROM `horariospelicula` WHERE `idpelicula`=? AND deleted_at IS NULL',[
            this.idpelicula
        ]);
        return rows;
    }
    async listarFiltro(){
        let sql='SELECT * FROM horariospelicula WHERE idpelicula=? AND deleted_at IS NULL';
        let arraydata=[this.idpelicula];
        if (this.FechaFiltro!='') {
            sql+=' AND fecha=?';
            arraydata.push(this.FechaFiltro);
        }
        const [rows]=await pool.execute(sql,arraydata);
        return rows
    }
    async listarSalasDisponibles(){
        let sql=`SELECT hp.idhorariopelicula,hp.idsala,s.nombre,s.numfilas FROM horariospelicula AS hp
        JOIN salas AS s ON hp.idsala=s.idsala
        WHERE hp.idpelicula=? AND hp.deleted_at IS NULL AND hp.fecha=? GROUP BY hp.idsala`
        const [rows]=await pool.execute(sql,[
            this.idpelicula,
            this.fecha
        ]);
        return rows;
    }
    
    async listarHorariosxSala(){
        const [rows]=await pool.query('SELECT * FROM horariospelicula WHERE idsala=? AND idpelicula=? AND deleted_at IS NULL AND fecha=?',[
            this.idsala,
            this.idpelicula,
            this.fecha
        ])
        return rows;
    }
    async ListaHorarioValidacion(){
        const [rows]=await pool.query('SELECT * FROM horariospelicula WHERE fecha=? AND idsala=? AND hora=? AND deleted_at IS NULL',[
            this.fecha,
            this.idsala,
            this.hora
        ]);
        return rows;
    }
    async DiferenciaHorario(){
        const [rows]=await pool.query('SELECT * FROM horariospelicula WHERE (TIME(hora) BETWEEN ? AND ?) AND idsala=? AND fecha=? AND deleted_at IS NULL',[
            this.HoraFiltro,
            this.hora,
            this.idsala,
            this.fecha
        ]);
        return rows;
    }
}
module.exports=HorarioPelicula