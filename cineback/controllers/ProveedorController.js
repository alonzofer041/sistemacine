let ProveedorClass=require("../models/Proveedor");
const jwt=require("jsonwebtoken");

//@desc crear proveedor
//@route POST /api/proveedor
//@access public
const addProveedor=(async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jwtSecretKey");
    let Proveedor=new ProveedorClass;
    Proveedor.idempresa=decoded.Usuario.idempresa;
    Proveedor.idsucursal=decoded.Usuario.idsucursal;
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
    let respuesta=await Proveedor.insertar();
    res.json(respuesta);
})

//@desc listar proveedor
//@route GET /api/proveedor
//@access public
const getProveedor=(async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jwtSecretKey");
    let Proveedor=new ProveedorClass;
    Proveedor.idempresa=decoded.Usuario.idempresa;
    Proveedor.idsucursal=decoded.Usuario.idsucursal;
    let respuesta=await Proveedor.listar(res);
    res.json(respuesta);
})

//@desc actualizar proveedor
//@route POST /api/proveedor/:id
//@access public
const updateProveedor=(async(req,res)=>{
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
    let respuesta=await Proveedor.actualizar();
    res.json(respuesta);
})

//@desc borrar proveedor
//@route DELETE /api/proveedor/:id
//@access public
const deleteProveedor=(async(req,res)=>{
    let Proveedor=new ProveedorClass;
    Proveedor.idproveedor=req.params.id;
    Proveedor.deleted_at=new Date();
    let respuesta=await Proveedor.eliminar();
    res.json(respuesta);
})

module.exports={addProveedor,getProveedor,updateProveedor,deleteProveedor}