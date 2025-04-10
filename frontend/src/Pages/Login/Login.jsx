import React from 'react'
import { useState } from 'react'
import PasswordInput from '../../Components/Cards/PasswordInput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../Utils/helper'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signInFailure, signInSuccess ,signInStart} from '../../redux/user/userSlice'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
const Login = () => {
  const loading = useSelector((state) => state.user.loading)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError('Invalid email')
      return
    }
    if (!password) {
      setError('Password is required')
      return
    }

    setError('')
    //login api Without withCredentials: true, cookies (like JWT tokens stored in httpOnly cookies) won't be sent to the backend.
    //Solution: withCredentials: true ensures that cookies are sent and received.
    try {
      
      dispatch(signInStart())
      console.log("Login Started")

      const res = await axios.post("https://avinotes.onrender.com/api/auth/signin", { email, password }, { withCredentials: true })
      console.log("Data Fetched")
      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(signInSuccess(res.data)) //dispatch(signInSuccess(res.data)) → Calls the signInSuccess reducer and passes res.data as the payload.
        navigate('/')

      }
      else {
        toast.error(res.data.message)
        dispatch(signInFailure(res.data.message))
      }
    }
    catch (err) {
      toast.error(err.message)
      dispatch(signInFailure(err.message))
    }



  }
  return (
    <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-7 py-10 drop-shadow-2xl'>
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7'>Login</h4>
          <input type='text' placeholder='Email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)} />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit' className='btn-primary cursor-pointer' disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Loading...
              </span>
            ) : 'Login'}
          </button>
          {error && <p className='text-red-500 text-xs text-center mt-4'>{error}</p>}
          <p className='text-slate-500 text-xs text-center mt-4'>Not registered yet ? {" "}
            <Link to={"/signup"} className='font-medium !text-primary !underline'>Create an account</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login