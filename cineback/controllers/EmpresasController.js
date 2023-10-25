let EmpresaClass=require("../models/Empresa");

//@desc crear empresa
//@route POST /api/empresa
//@access public
const addEmpresa=(async (req,res)=>{
    let Empresa=new EmpresaClass;
    Empresa.nombrecomercial=req.body.nombrecomercial;
    Empresa.razonsocial=req.body.razonsocial;
    Empresa.rfc=req.body.rfc;
    Empresa.direccion=req.body.direccion;
    Empresa.telefono=req.body.telefono;
    Empresa.email=req.body.email;
    Empresa.estado=req.body.estado;
    Empresa.ciudad=req.body.ciudad;
    Empresa.created_at=new Date();
    let respuesta=await Empresa.insertar();
    res.json(respuesta);
});

//@desc listar empresa
//@route GET /api/empresa
//@access public
const getEmpresa=(async (req,res)=>{
    let Empresa=new EmpresaClass;
    let rows=await Empresa.listar();
    res.json(rows);
});

//@desc actualizar empresa
//@route POST /api/empresa/:id
//@access public
const updateEmpresa=(async (req,res)=>{
    let Empresa=new EmpresaClass;
    Empresa.nombrecomercial=req.body.nombrecomercial;
    Empresa.razonsocial=req.body.razonsocial;
    Empresa.rfc=req.body.rfc;
    Empresa.direccion=req.body.direccion;
    Empresa.telefono=req.body.telefono;
    Empresa.email=req.body.email;
    Empresa.estado=req.body.estado;
    Empresa.ciudad=req.body.ciudad;
    Empresa.updated_at=new Date();
    Empresa.idempresa=req.params.id;
    let respuesta=await Empresa.actualizar();
    res.json(respuesta);
});

//@desc borrar empresa
//@route DELETE /api/empresa/:id
//@access public
const deleteEmpresa=(async (req,res)=>{
    let Empresa=new EmpresaClass;
    Empresa.deleted_at=new Date();
    Empresa.idempresa=req.params.id;
    let respuesta=await Empresa.eliminar(res);
    res.json(respuesta);
})

module.exports={addEmpresa,getEmpresa,updateEmpresa,deleteEmpresa}