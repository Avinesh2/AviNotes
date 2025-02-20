import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { RxCross2 } from "react-icons/rx";
const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div className='w-40 sm:w-60 md:w-80 flex items-center px-4 rounded-md bg-slate-100'>
        <input type="text" placeholder="Search" className='w-full text-xs bg-transparent py-[11px] outline-none' value={value} onChange={onChange}/>
        {value && <RxCross2 className='text-slate-500 text-xl cursor-pointer mr-3 hover:text-black' onClick={onClearSearch}/>}
        <FaMagnifyingGlass className='text-slate-500 text-xl cursor-pointer hover:text-black ' onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar