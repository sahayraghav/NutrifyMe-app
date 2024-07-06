import React, { useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import Food from './Food';

export default function Track() {

  const loggeddata = useContext(UserContext);
  const [fooditems,setfooditems] = useState([])

  const [food,setfood] = useState(null)

  // useEffect(()=>{
  //   console.log(food);
  // })

  function searchfood(event){

    if (event.target.value.length !==0){
      fetch(`http://localhost:8000/foods/${event.target.value}`,{
        method:"GET",
        headers:{
          "Authorization":"Bearer "+loggeddata.loggeduser.token
        }
      })
      .then((response)=>response.json())
      .then((data)=>{
        console.log(data);
        if (data.message ===undefined){
          setfooditems(data)
        }
        else{
          setfooditems([])
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    else{
      setfooditems([])
    }

  }


  return (
    <>
    
        <section className='container track-container'>
        
        <div className='search'>

          <input className="search-inp" onChange={searchfood}
          type="search" placeholder="search" />

          <div className='search-results'>
          
          {
              fooditems.map((item)=>{
                  return (
                    <p className='item' onClick={()=>{
                      setfood(item)
                      console.log(food);
                    }} key={item._id}>{item.name}</p>
                  )
              })
          }
          
          </div>

        </div>

        {

            food!==null?(
              <Food food = {food}/>
            ):null

        }
         
        
        
        </section>
    
    </>
  )
}
