const express = require("express");
const app = express()
app.use(express.json())
require("dotenv").config()
const cors = require("cors")
app.use(cors())

const {connection} = require("./db")
const {userRouter} = require("./routes/users.routes")
const {productRouter} = require("./routes/products.routes")







app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Credentials', true);
        return res.status(200).json({});
    }
    next();
});


app.get("/", (req,res)=>{
    res.send("HOME PAGE")
})

app.use("/users", userRouter)

app.use("/api", productRouter)

app.listen(process.env.port, async ()=>{
    try{
        await connection
        console.log("Connected to DB")
    } catch(err){
        console.log(err.message)
    }
    console.log(`Server is listening at port ${process.env.port}`)
})

