import React,{useState,useEffect} from'react'
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
    } from 'reactstrap';

import axios from 'axios'

import { Link } from 'react-router-dom';   



export default function SeeDetail({match})
{











	const [detail,setdetail] =React.useState([{}])
  const [loading,setloading] =React.useState(false)
 
useEffect(() => {
  setloading(true)



    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${match.params.id}`)
    .then(res=>{
      
      setdetail(res.data)
setloading(false)
      
    })
    .catch(err=>{
      console.log(err)
    });
  },[])
if(loading)
{
  return <h2 className="text-light">..loading Details</h2>
}

	return(
		<>
    <div>
    <Breadcrumb><BreadcrumbItem><Link to="/">All Users </Link>/UserDetails/{match.params.id1}</BreadcrumbItem></Breadcrumb>
    <div className="container-fluid  ">

 

 

		<div className="row  d-flex justify-content-around ">

    
  {
       detail.map((list)=>(

        



          <div key={list.id} className="col-lg-4 col-md-4 col-10 m-1 trans" >
          
                        <Card className="  general  " >
                            <CardImg top height="100" width="100" 
                            src=
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUbCZTw1SrtL7yOkiWZWC2F9Rmgz1nMj_ltA&usqp=CAU"   />
                            
                            <CardBody>
                                <CardTitle> Title :{list.title}</CardTitle>
                                 
                                
                                  
                                  <CardText>Body:{list.body}</CardText>
                                
                                

                            </CardBody>
                        </Card>
                   
                </div>


          )

      ) 
    }
    </div>
		
     </div>
      </div>
		
		</>)
}