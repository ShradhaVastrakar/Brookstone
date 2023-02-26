const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    id:{type:Number , required: true},
    image:{data: Buffer , type:String , required:true},
    description:{type:String , required:true},
    price:{type:Number , required:true},
    email:String
})

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
ProductModel
}