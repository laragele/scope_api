const express= require(`express`);
const router= express.Router();
const Libro =require(`./Libro`);
const { requiredScopes } = require("express-oauth2-jwt-bearer");

//peticion get al servidor para la lectura de los objetos en la base de datos
//http://localhost:3000/libros
router.get(`/`,requiredScopes("read:libros"), async (req,res)=>{
    try{
        const libros= await Libro.find();
        res.json(libros);
    }catch(err){
        res.status(500).json({error: "Error al obtener los libros"})
    }
})


//peticion post para crear un nuevo libro en la base de datos
//http://localhost:3000/libros
router.post(`/`, requiredScopes("write:libros"), async (req,res)=>{
    try{
        const nuevoLibro= new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    }catch(err){
        res.status(500).json({error: "Error al crear el libro"})
    }
})

//peticion put para actualizar la informacion de un libro en la base de datos;
//http://localhost:3000/libros/657c8c6bebedc460b3cbb5b9
router.put(`/:id`,requiredScopes("write:libros"), async (req,res)=>{
    try{
        const libro= await Libro.findByIdAndUpdate(req.params.id, req.body, { new:true});
        res.json(libro);
    }catch(err){
        res.status(500).json({error: "Error al actualizar el libro"})
    }
})

//peticion delete para eliminar de la base de datos un libro por id
//http://localhost:3000/libros/657c8c6bebedc460b3cbb5b9
router.delete(`/:id`,requiredScopes("write:libros"), async (req,res)=>{
    try{
        const libros= await Libro.findByIdAndDelete(req.params.id);
        res.json({message: `se ha eliminado el libro correctamente`});
    }catch(err){
        res.status(500).json({error: "Error al eliminar el libro"})
    }
})


module.exports=router;