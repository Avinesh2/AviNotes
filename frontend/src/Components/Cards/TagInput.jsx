import React from 'react'
import { MdClose } from 'react-icons/md'
import { useState } from 'react'

const TagInput = ({tags,setTags}) => {
    const handleRemoveTag=(tagToRemove)=>{
        setTags(tags.filter((tag)=>tag!==tagToRemove))
    }
    const handleKeyDown=(e)=>{
        if(e.key==='Enter' && e.target.value){
            setTags([...tags,e.target.value])
            setInputValue('')
        }
    }

    const [inputValue,setInputValue]=useState('')
  return (
    <div>
        {tags?.length>0 && (<div className='flex items-center gap-2 flex-wrap mt-2'>
            {
                tags.map((tag,index)=>(<span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>#{tag}
                <button onClick={()=>{handleRemoveTag(tag)}}>
                <MdClose className='text-red-500'/>

                </button></span>))
            
                    
            }
        </div> )}
        <div className='flex items-center gap-2'>
            <input type='text' placeholder='tags' value={inputValue} onChange={(e)=>setInputValue(e.target.value)} className='text-sm bg-transparent border px-3 py-2 rounded outline-none' onKeyDown={handleKeyDown}/>
        </div>
    </div>
  )
}

export default TagInput