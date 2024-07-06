import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {

      const[userdetails,setuserdetails] = useState({
        name:"",
        email:"",
        password:"",
        age:""
      })

      const [message,setmessage] = useState({
        type:"invisible-msg",
        text:"dummy message"
      })

      function handleinput(event){
        
          setuserdetails((prevState)=>{

              return {...prevState,[event.target.name]:event.target.value};

          })

      }

      function handlesubmit(e){
          e.preventDefault()
          console.log(userdetails);

          fetch("http://localhost:8000/register",{
              method:"POST",
              body:JSON.stringify(userdetails),
              headers:{
                "Content-Type":"application/json"
              }
          })
          .then((response)=>response.json())
          .then((data)=>{
            setmessage({type:"success",text:data.message})

            setuserdetails({
              name:"",
              email:"",
              password:"",
              age:""
            })

            setTimeout(()=>{
                setmessage({type:"invisible-msg",text:"dummy message"})
            },5000)


          })
          .catch((err)=>{
            console.log(err);
          })
      }


  return (
    <section className='container'>
    
      <form className='form' onSubmit={handlesubmit}>
      
        <h1>start your fitness</h1>

        <input className='inp' value={userdetails.name} required type='text' onChange={handleinput} placeholder='enter name' name="name"/>

        <input className='inp' value={userdetails.email} required type='text' onChange={handleinput} placeholder='enter email' name="email"/>

        <input className='inp' value={userdetails.password} required  type='text' onChange={handleinput} placeholder='enter password' name="password"/>

        <input className='inp' value={userdetails.age} type='text' onChange={handleinput} placeholder='enter age' name="age"/>

        <button className='btn'> join</button>

        <p>already registered ? <Link to="/login">Login </Link> </p>

        <p className={message.type}> {message.text} </p>
         
      </form>

    </section>
  )
}

