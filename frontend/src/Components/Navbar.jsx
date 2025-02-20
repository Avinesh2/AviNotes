import React from 'react'
import { useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar/SearchBar'
import ProfileInfo from './Cards/ProfileInfo'
import { useDispatch, useSelector } from 'react-redux'
import { signOutStart,signOutFailure,signOutSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
const Navbar = () => {
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const checkAuthStatus = async () => {
      try {
          const res = await axios.get('https://avinotes.onrender.com/api/auth/checkAuth', { withCredentials: true });
          if (!res.data.success) {
            dispatch(signOutSuccess()); // Logout if no user data
            setUserInfo("Guest");
            navigate('/login');
          } 
      } catch (err) {
          dispatch(signOutSuccess()); // Logout on error (cookie removed or expired)
          setUserInfo("Guest");
          navigate('/login');
      }

  };
  useEffect(() => {
    checkAuthStatus(); // Check authentication when Navbar mounts
}, []);

    
    const { currentUser, loading, errorDispatch } = useSelector(state => state.user)
    const [userInfo, setUserInfo] = useState(null)
    useEffect(() => {
      
        if (currentUser === null ) {
            setUserInfo("Guest")
            navigate('/login')
        }
        else {
            
            console.log(currentUser.user)
           
            setUserInfo(currentUser?.user?.username)
        }
    },[currentUser])

   
  
    
    
    
     
    const onLogout = async() => {
        try{
            dispatch(signOutStart())
            console.log("Logout Started")
            const res=await axios.get("https://avinotes.onrender.com/api/auth/signout",{withCredentials:true})
            console.log("Data Fetched")
            console.log(res.data)
            if(res.data.success)
            {
                toast.success(res.data.message)
                dispatch(signOutSuccess())

                navigate('/login')
            }
            else{
                toast.error(res.data.message)
                dispatch(signOutFailure(res.data.message))
                return
            }
        }
        catch(err)
        {
            dispatch(signOutFailure(err.message))

        }
        
    }
    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <Link to='/'>
                <h2 className='text-xl font-medium text-black py-2 '>
                    <span className='text-slate-500'>Avi</span>
                    <span className='text-slate-900'>Notes</span>
                </h2>
            </Link>
            
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
    )
}

export default Navbar