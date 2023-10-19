let SucursalClass = require("../models/Sucursal");

//@desc crear sucursal
//@route POST /api/sucursal
//@access public
const addSucursal=((req,res)=>{
    let Sucursal=new SucursalClass;
    Sucursal.idsucursal=1;
    Sucursal.idempresa=1;
    Sucursal.nombre=req.body.nombre;
    Sucursal.direccion=req.body.direccion;
    Sucursal.telefono=req.body.telefono;
    Sucursal.email=req.body.email;
    Sucursal.created_at=new Date();
    Sucursal.insertar(res);
})

//@desc listar sucursal
//@route GET /api/sucursal
//@access public
const getSucursal=((req,res)=>{
    let Sucursal=new SucursalClass;
    Sucursal.idsucursal=1;
    Sucursal.idempresa=1;
    Sucursal.listar(res);
})

//@desc actualizar sucursal
//@route POST /api/sucursal/:id
//@access public
const updateSucursal=((req,res)=>{
    let Sucursal=new SucursalClass;
    Sucursal.nombre=req.body.nombre;
    Sucursal.direccion=req.body.direccion;
    Sucursal.telefono=req.body.telefono;
    Sucursal.email=req.body.email;
    Sucursal.updated_at=new Date();
    Sucursal.idsucursal=req.params.id;
    Sucursal.actualizar(res);
})

//@desc borrar sucursal
//@route DELETE /api/sucursal/:id
//@access public
const deleteSucursal=((req,res)=>{
    let Sucursal=new SucursalClass;
    Sucursal.deleted_at=new Date();
    Sucursal.idsucursal=req.params.id;
    Sucursal.eliminar(res);
})

module.exports={
    addSucursal,
    getSucursal,
    updateSucursal,
    deleteSucursal
}