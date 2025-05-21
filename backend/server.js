const express = require ('express');
const app= express();
const userRegisterconnection = require('./config/userRegisterdb');

const cors = require('cors');

const dotenv= require('dotenv')
dotenv.config()

const port = process.env.PORT

const production = process.env.NODE_ENV


const products = require('./routes/product');
const order = require('./routes/order');
const userRoutes = require('./routes/userRoutes')



// Enable CORS for all origins
app.use(cors());


app.use(express.json());
app.use('/api/v1',products)
app.use('/api/v1',order)
app.use("/api/users", userRoutes)





userRegisterconnection.connect((err)=>{
    if (err){
        throw err
    }
    console.log("users Db connected")

})

app.listen(port,()=>{
    console.log(`server listening to port ${port} in ${production}`)
})
