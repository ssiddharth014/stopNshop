const express= require( 'express');
const data= require('./data.js');
const cors = require('cors')
const bodyParser= require('body-parser')
const mongoose= require('mongoose');
const path= require('path')
const config= require('./config')



const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productRoutes')
const orderRoute = require('./routes/orderRoutes')
const uploadRoute = require('./routes/uploadRoutes')

const URL ="mongodb+srv://shop:shop@shop.abwnf.mongodb.net/<dbname>?retryWrites=true&w=majority"
const db=async() =>{
	try{
await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true})
console.log('connected..');
}
catch(err){
	console.log(err)
}
}
db();


const app=express();
app.use(bodyParser.json());
app.use(cors())
app.use('/api/users',userRoute )
app.use('/api/products',productRoute)
app.use('/api/orders', orderRoute);
app.use('/api/uploads', uploadRoute);

app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`));
});

app.listen(config.PORT, () => {
  console.log('Server started at http://localhost:5000');
});

