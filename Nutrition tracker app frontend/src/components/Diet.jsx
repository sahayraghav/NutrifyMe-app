import React, { useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'

export default function Diet() {

  let loggeddata = useContext(UserContext)
  
  const [items,setitems] = useState([])

  useEffect(()=>{

      fetch(`http://localhost:8000/track/${loggeddata.loggeduser.userid}/06-01-2024`,{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${loggeddata.loggeduser.token}`
          }
      })
      .then((response)=>response.json())
      .then((data)=>{
        console.log(data);
      })
      .catch((err)=>{
        console.log(err);
      })

  },[])

  return (
    <section className='container diet-container'>
    
        {
          
        }
    
    </section>
  )
}
