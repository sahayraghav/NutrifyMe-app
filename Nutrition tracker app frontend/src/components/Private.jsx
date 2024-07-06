import React from 'react'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
export default function Private(props) {



    const loggeddata = useContext(UserContext)

  return (
     
    loggeddata.loggeduser!==null?
    <props.Component/>:<Navigate to="/login"/>
  )
}
