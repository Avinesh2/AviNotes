import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Signup from "./Pages/Signup/Signup"
import Navbar from './Components/Navbar'
import { ToastContainer } from 'react-toastify'
import GoogleRedirect from './Pages/Login/GoogleRedirect'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes >
    <Route path='/' element={<Home/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path="/google-success" element={<GoogleRedirect />} />

    </Routes>
    <ToastContainer position='top-center'/>
    </BrowserRouter>
  )
}

export default App