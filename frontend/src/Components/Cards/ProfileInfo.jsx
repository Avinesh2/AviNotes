import React from 'react'
import { getInitials } from '../../Utils/helper'
import { useSelector } from 'react-redux'
const ProfileInfo = ({userInfo,onLogout}) => {
  const { currentUser } = useSelector(state => state.user)
  return (
    // isme gap-3 diya hai kyunki isse items ke beech me gap aayega fixed width nhi di hai kyunki name bda hoskta hai to wo is div ke bahaar jaayega
    <div className='flex items-center gap-3 justify-between'> 
        <div className='bg-slate-100 h-10 w-10 rounded-full text-sm flex items-center justify-center text-slate-950 font-medium'>{getInitials(userInfo || "Guest")}</div>
        <div><p className='text-sm font-medium'>{userInfo}</p></div>
        {currentUser && <button className='text-red-800 text-sm cursor-pointer hover:underline' onClick={onLogout}>Logout</button>}
    </div>
  )
}

export default ProfileInfo