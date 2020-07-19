



import axios from 'axios'
import Cookie from 'js-cookie'

import {
  CART_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_SHIPPING,CART_SAVE_PAYMENT
} from '../constants/cartConstants';


const  addToCart=(productId,qty)=> async (dispatch,getState)=>{
	try{
		console.log(productId,qty)
		const {data}= await axios.get(`http://localhost:5000/api/products/${productId}`) 
		



		dispatch({
			type:CART_ADD_ITEM, payload:{
				product:data._id,
				name:data.name,
				image:data.imageurl,
				price:data.price,
				countInStock: data.countInStock,
				qty
			}
		});
		const {cart:{cartItems}}= getState();
		Cookie.set("cartItems",JSON.stringify(cartItems));

	}
	catch(err){
		console.log(err)

	}
}
const removeFromCart=(productId)=> async(dispatch,getState)=>{
	try{
		dispatch({type:CART_REMOVE_ITEM,payload:productId})
const {cart:{cartItems}}= getState();
		Cookie.set("cartItems",JSON.stringify(cartItems));

	}
	catch(err)
	{

	}
}
const saveShipping= (data)=>(dispatch,getState)=>{
	try{
dispatch({type:CART_SAVE_SHIPPING,payload:data})

	}
	catch(err)
	{
		console.log(err);

	}

}
const savePayment= (data)=>(dispatch,getState)=>{
	try{
dispatch({type:CART_SAVE_PAYMENT,payload:data})

	}
	catch(err)
	{
		console.log(err);

	}

}
export {addToCart, removeFromCart,saveShipping,savePayment}
