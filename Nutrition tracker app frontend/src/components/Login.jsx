import React from 'react'
import { useState,useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'


export default function Login() {

    const loggedindata = useContext(UserContext);
    const navigate = useNavigate()

    const [usercred,setusercred] = useState({
        email:"",
        password:""
    })

    const [message,setMessage] = useState({
        type:"invisible-msg",
        text:"Dummy Msg"
    })

    function handleinput(event){
        setusercred((prev)=>{
            return {...prev,[event.target.name]:event.target.value}
        })

    }

    function handlesubmit(event){
        event.preventDefault()
        

        fetch("http://localhost:8000/login",{
            method:"POST",
            body:JSON.stringify(usercred),
            headers:{
                "content-type":"application/json"
            }
        })
        .then((response)=>{

                if(response.status===404){
                    setMessage({type:"error",text:"Username or Email Doesnt Exist"});
                }
                else if(response.status===403) {
                    setMessage({type:"error",text:"Incorrect Password"});
                }
               
    
                setTimeout(()=>{
                    setMessage({type:"invisible-msg",text:"Dummy Msg"})
                },5000)
    
                return response.json();
        })
        .then((data)=>{

            console.log(data);

            if (data.token!==undefined){
                localStorage.setItem("nutrify-user",JSON.stringify(data));

                loggedindata.setloggeduser(data)

                navigate("/track")
                
            }

        })
        .catch((err)=>{
            console.log(err);
        })
    }

  return (
    <section className='container '>
    
      <form className='form' onSubmit={handlesubmit}>
      
        <h1>Login to fitness</h1>

        <input className='inp' type='text' onChange={handleinput} placeholder='enter email' name="email"/>

        <input className='inp' type='text' onChange={handleinput} placeholder='enter password' name="password"/>

        <button className='btn'> Login</button>

        <p> Don't have an account ?<Link to = "/register"> Register now </Link> </p>
        
        <p className={message.type}>{message.text}</p>

      </form>

    </section>
  )
}

