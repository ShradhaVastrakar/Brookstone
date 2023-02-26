const express = require("express");
const {ProductModel} = require("../models/products.models")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())

const productRouter = express.Router();
const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

const multer = require("multer");
const path = require("path");


// const storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//      cb(null, `${__dirname}/uploads`)
//     },
//     filename: (req,file,cb) => {
//      cb(null, file.originalname)
//     }
// })

// const upload = multer({storage : storage})


productRouter.get("/", async (req,res) => { 
    const product = await ProductModel.find();
    res.send(product)

})

productRouter.get("/products", async (req,res) => {
    const product = await ProductModel.find();
    res.send(product)
})


productRouter.get("/filter", async (req,res) => {
    
    const product = await ProductModel.find({$and : [ {price: {$gte : req.query.min}}, {price: {$lte: req.query.max}}]});
    res.send(product)

})




productRouter.post("/addProduct" ,  async (req,res) => {
    const payload = req.body
    // const product = new ProductModel({
    //     id: req.body.id,
    //     description : req.body.description,
    //     price : req.body.price,
    //     image : req.body.image
        
    // })
    const product = new ProductModel(payload)
    await product.save()

    res.send("Product created successfully")
})




productRouter.patch("/update/:id", async (req,res) =>{
    //verify token
    const ID = req.params.id
    const payload = req.body
    try{
   await ProductModel.findByIdAndUpdate({_id:ID}, payload)
   res.send({"msg": "Updated the Products"})
    }
    catch(err){
        res.send({ "msg": "Product cannot be Updated", "error": err.message})
    }  
})
productRouter.put("/updateput/:id", async (req,res) =>{
    //verify token
    const ID = req.params.id
    const payload = req.body
    try{
   await ProductModel.findByIdAndUpdate({_id:ID}, payload)
   res.send({"msg": "Updated the Products"})
    }
    catch(err){
        res.send({ "msg": "Product cannot be Updated", "error": err.message})
    }  
})


productRouter.delete("/delete/:id", async (req,res) =>{
    const ID = req.params.id;
    try {
        await ProductModel.findByIdAndDelete({_id:ID})
        res.send({"msg" : "Deleted the Product"})
    } catch (error) {
        res.send({ "msg": "Product cannot be Deleted", "error": err.message})
    }
})

module.exports = {
    productRouter
}

