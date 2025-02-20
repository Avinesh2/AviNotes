import React from 'react'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    return (
        <div className='flex items-center border-[1.5px] rounded  px-5 mb-3'>
            <input type={isShowPassword ? "text" : "password"} placeholder={placeholder || "Password"} className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none' value={value} onChange={onChange}/>
            {isShowPassword ? <FaRegEye className='text-primary cursor-pointer' onClick={() => setIsShowPassword(false)} /> : <FaRegEyeSlash className='text-primary cursor-pointer' onClick={() => setIsShowPassword(true)} />}
        </div>
    )
}

export default PasswordInput