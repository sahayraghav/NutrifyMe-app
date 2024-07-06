import React from 'react'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Headers() {

    const loggeddata = useContext(UserContext)
    const navigate = useNavigate()

    function logout(){
        localStorage.removeItem("nutrify-user");

        loggeddata.setloggeduser(null)

        navigate("/login")
    }


  return (
    <div className='header'>
      <ul>
      
        <li>Track</li>
        <li>Diet</li>
        <li onClick={logout}>logout</li>

      </ul>
    </div>
  )
}
