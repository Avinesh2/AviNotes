import React from 'react'
import { useState } from 'react'
import PasswordInput from '../../Components/Cards/PasswordInput'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../Utils/helper'
import axios from 'axios'
import { toast } from 'react-toastify'
const Signup = () => {
  const navigate = useNavigate()
  const [name,setName]=useState('')
  const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')
    const [error, setError] =useState('')
  const handleSignup = async(e) => {
    e.preventDefault()
    if(!name){
      setError('Name is required')
      return}
    if(!validateEmail(email)){
          setError('Invalid email')
          return
        }
        if(!password){
          setError('Password is required')
          return
        }
    
        setError('')
        try{
          const res=await axios.post("https://avinotes.onrender.com/api/auth/signup",{username:name,email,password},{withCredentials:true})
          if(res.data.success){
            console.log(res.data)
            toast.success(res.data.message)
            console.log('Signup Success')
            
            setError('')
            navigate('/login')
          }
          else{
            toast.error(res.data.message)
            console.log(res.data.message)
            setError(res.data.message)
          }
        }
        catch(err)
        {
          toast.error(err.message)
          console.log(err.message)
          setError(err.message)
        }

  }
  return (
    <div className='flex items-center justify-center mt-28'>
    <div className='w-96 border rounded bg-white px-7 py-10 drop-shadow-2xl'>
      <form onSubmit={handleSignup}>
        <h4 className='text-2xl mb-7'>Sign Up</h4>
        <input type='text' placeholder='Name' className='input-box' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type='text' placeholder='Email' className='input-box' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit' className='btn-primary cursor-pointer'>Signup</button>
       { error && <p className='text-red-500 text-xs text-center mt-4'>{error}</p>}
        <p className='text-slate-500 text-xs text-center mt-4'>Already have an account? {" "}
        <Link to={"/login"} className='font-medium !text-primary !underline'>Login</Link></p>
      </form>
    </div>
  </div>
  )
}

export default Signup