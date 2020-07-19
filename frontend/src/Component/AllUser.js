import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom';                     //formfeedback 
import axios from 'axios'


import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
    } from 'reactstrap';





export default function AllUsers() {

 



  
  const [users,setuser] =React.useState([{}])
  const [loading,setloading] =React.useState(false)
  const [search,setsearch] =React.useState('')
  const [filteredusers,setfilteredusers]= React.useState([{}])
  useEffect(() => {


setloading(true)

    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res=>{
     
      setuser(res.data)

     
      setloading(false)

    })
    .catch(err=>{
      console.log(err)
    });
  },[])

  useEffect(()=>{
    console.log(search.toLowerCase())
      
       setfilteredusers(
        users && users.filter(fil=>{
          if(typeof fil.username=== 'string' && typeof search==='string')
        {
       return fil.username.toLowerCase().includes(search.toLowerCase())
     }

          //console.log("FUN",fil.username)
         //return fil.username.includes(search)
        }))
     

    },[search,users])  
    
if(loading){
  return <h1 className="text-light mt-3 ml-3">..Loading Users</h1>
}

  return (
    
   <div>
               
       
<div className="container-fluid mt-3 ">
 <div className="d-flex justify-content-center">
<input type="text" className="input bg-light text-dark" placeholder="Search by name"
onChange={e=>setsearch(e.target.value)}/>
 </div>
  <div className="row d-flex justify-content-around "  >
   

      { filteredusers.map((ann) => {
    return(
 

      



<div key={ann.id} className="col-lg-4 col-md-4 col-6 m-1 trans" >
 


<Link to={`/seeDetail/${ann.id}/${ann.username}`}>
    
      <Card className="general"  >
     
                
                    <CardImg width="100" height="100" 
src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUbCZTw1SrtL7yOkiWZWC2F9Rmgz1nMj_ltA&usqp=CAU" 
                     />
                    <CardBody>
                              
                              Username:  <CardText>{ann.username}</CardText>
                              Email:  <CardText>{ann.email}</CardText>
                    </CardBody>
      
               
      </Card>
      </Link>
  </div>

       
     )
    })
  }
    
</div>

</div>
</div>

    






  

  )


}
