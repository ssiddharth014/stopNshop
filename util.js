const jwt =require( 'jsonwebtoken');
const config = require( './config');

module.exports.getToken = (user) => {
	console.log(user)
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

module.exports.isAuth= (req,res,next)=>{
	const token= req.headers.authorization;
	if(token)
	{
		
		const onlyToken = token.slice(7,token.length);
		
		jwt.verify(onlyToken,config.JWT_SECRET, (err,decode)=>{
			if(err){
				console.log(err)
				return res.status(401).send({msg:"Invalid Token"});
			}
			req.user=decode;
			next();
			return
		});
	}
	else{
       return res.status(401).send({msg:"Token is not supplied"})
	}
	
}

module.exports.isAdmin=(req,res,next)=>{
	if(req.user && req.user.isAdmin){
		return next()
	}
	return res.status(401).send({msg:"Admin token not valid"})
}
