let ProveedorClass=require("../models/Proveedor");


//@desc crear proveedor
//@route POST /api/proveedor
//@access public
const addProveedor=((req,res)=>{
    let Proveedor=new ProveedorClass;
    Proveedor.idempresa=1;
    Proveedor.idsucursal=1;
    Proveedor.nombrecomercial=req.body.nombrecomercial;
    Proveedor.razonsocial=req.body.razonsocial;
    Proveedor.fechaestreno=req.body.fechaestreno;
    Proveedor.email=req.body.email;
    Proveedor.contacto=req.body.contacto;
    Proveedor.telefono=req.body.telefono;
    Proveedor.direccion=req.body.direccion;
    Proveedor.estado=req.body.estado;
    Proveedor.ciudad=req.body.ciudad;
    Proveedor.created_at=new Date();
    Proveedor.insertar(res);
})

//@desc listar proveedor
//@route GET /api/proveedor
//@access public
const getProveedor=((req,res)=>{
    let Proveedor=new ProveedorClass;
    Proveedor.idempresa=1;
    Proveedor.idsucursal=1;
    Proveedor.listar(res);
})

//@desc actualizar proveedor
//@route POST /api/proveedor/:id
//@access public
const updateProveedor=((req,res)=>{
    let Proveedor=new ProveedorClass;
    Proveedor.nombrecomercial=req.body.nombrecomercial;
    Proveedor.razonsocial=req.body.razonsocial;
    Proveedor.fechaestreno=req.body.fechaestreno;
    Proveedor.email=req.body.email;
    Proveedor.contacto=req.body.contacto;
    Proveedor.telefono=req.body.telefono;
    Proveedor.direccion=req.body.direccion;
    Proveedor.estado=req.body.estado;
    Proveedor.ciudad=req.body.ciudad;
    Proveedor.updated_at=new Date();
    Proveedor.idproveedor=req.params.id;
    Proveedor.actualizar(res);
})

//@desc borrar proveedor
//@route DELETE /api/proveedor/:id
//@access public
const deleteProveedor=((req,res)=>{
    let Proveedor=new ProveedorClass;
    Proveedor.idproveedor=req.params.id;
    Proveedor.deleted_at=new Date();
    Proveedor.eliminar(res);
})

module.exports={addProveedor,getProveedor,updateProveedor,deleteProveedor}