const express= require('express')
const Product= require('../models/productModal')
const util =require('../util')




const router = express.Router();

router.get('/', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  const products = await Product.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  );
  res.send(products);
});



router.get("/:id",async (req,res)=>{


	const product= await Product.findOne({_id:req.params.id});
	if(product){
res.send(product)

	}else{
		res.status(404).send({message:"Product Not found"})
	}
	
})




router.post('/:id/reviews',util.isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});




router.post("/",util.isAuth,util.isAdmin,async(req,res)=>{
	console.log(req.body)
	
	const product = new Product({
		name:req.body.name,
		price:req.body.price,
		imageurl:req.body.imageurl,
		brand:req.body.brand,
		category:req.body.category,
		countInStock:req.body.countInStock,
		description:req.body.description,
		
	});
	const newProduct = await product.save();
	if(newProduct)
	{
		return res.status(201).send({message:"New product created", data:newProduct})
	}
	return res.status(500).send({message:"Error in creating product"})

});

router.put("/:id",util.isAuth,util.isAdmin,async(req,res)=>{
	console.log(req,"req")
	const productId= req.params.id;
	const product=  await Product.findOne({_id:productId});

	if(product)
	{
        
		product.name=req.body.name;
		product.price=req.body.price;
		product.imageurl=req.body.imageurl;
		product.brand=req.body.brand;
		product.category=req.body.category;
		product.countInStock=req.body.countInStock;
		product.description=req.body.description;
		
	
	const updateProduct = await product.save();
	if(updateProduct)
	{
		return res.status(200).send({message:"Product Updated", data:updateProduct})
	}
}
	return res.status(500).send({message:"Error in updating product"});

})	

		router.delete("/:id",util.isAuth,util.isAdmin,async(req,res)=>{

		const deleteProduct= await Product.findById(req.params.id)
		if(deleteProduct)
		{
			await deleteProduct.remove();
			res.send({msg:"Product deleted"})
		}

		else{
		res.send({msg:"Error in deletion"})
	}
	})


module.exports= router;
