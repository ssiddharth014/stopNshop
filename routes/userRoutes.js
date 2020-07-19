const express= require('express')
const User= require('../models/userModel')
const  getToken =require('../util')

const router = express.Router();





router.get('/createadmin',async (req,res)=>{
	
try{


	const user= new User({
		name:'Siddharth',
		email:'ss@gmail.com',
		password:"Qwerty@123",
		isAdmin:true
	});
	const newUser = await user.save();
	res.send(newUser);

}
catch(err){
	res.send({msg: err.message})
}


	

})

router.post('/signin',async(req,res)=>{
	try{
		const signinUser = await User.findOne({email:req.body.email,
			password:req.body.password});
		const token= getToken.getToken(signinUser)
		if(signinUser)
		{
			console.log(signinUser)

res.send({
                 	_id:signinUser.id,
                 	name:signinUser.name,
                 	email:signinUser.email,
                 	isAdmin:signinUser.isAdmin,
                 	token:getToken.getToken(signinUser)
                 })
		
                 
		}
		else{
			res.status(401).send({msg:'Invalid Email/Password'})
		}

	}
	catch(err){
		res.send({msg:err.msg})

	}
})
router.post('/register', async(req,res)=>{
	try{
		
          
           const user= new User({
           	name:req.body.name,
           	email:req.body.email,
           	password:req.body.password
           })

           const newUser= await user.save()
           if(newUser){
           	res.send({
           		    _id:newUser.id,
                 	name:newUser.name,
                 	email:newUser.email,
                 	isAdmin:newUser.isAdmin,
                 	token:getToken.getToken(newUser)

           	})
           }
       
       
       else{
           res.status(401).send({msg:"Invalid user data"})
       }
   
	}
	catch(err){
		res.send({msg:err.msg})

	}
})
module.exports= router;