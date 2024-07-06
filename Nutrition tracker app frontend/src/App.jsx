import './App.css'
import {BrowserRouter , Routes, Route, useNavigate} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Notfound from './components/Notfound'
import Track from './components/Track'
import { UserContext } from './contexts/UserContext'
import { useEffect, useState } from 'react'
import Private from './components/Private'
import Diet from './components/Diet'

function App() {


  const [loggeduser,setloggeduser] 
  = useState(JSON.parse(localStorage.getItem("nutrify-user")))


  return (
    <>
      <UserContext.Provider value ={{loggeduser,setloggeduser}}>

      

            <Routes>
            
            <Route path="/" element={<Login/>}/>
            <Route path ="/register" element = {<Register/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/track" element={<Private Component={Track}/>}/>
            <Route path="/diet" element={<Private Component={Diet}/>}/>
            <Route path="*" element={<Notfound/>}/>

            </Routes>

      

      </UserContext.Provider>

    </>
  )
}

export default App
