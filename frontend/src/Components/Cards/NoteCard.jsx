import React from 'react'
import { MdCreate, MdDelete, MdOutlinePushPin } from 'react-icons/md'
import moment from "moment";
const NoteCard = ({title,date,content,tags,onPinNote,isPinned,onEdit,onDelete}) => {
   
  return (
    <div className=' rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
        <div className='flex items-center justify-between'>
            <div >
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className='text-xs text-green-700'>{moment(date).format("Do MMM YYYY")}</span>
                
            </div>
            <MdOutlinePushPin className={`hover:text-primary text-lg ${isPinned?"text-primary":"text-slate-300"}`} onClick={onPinNote}/>
        </div>
        <p className='text-xs text-slate-600 mt-2'>{content?.slice(0,60)} </p>
        <div className='flex items-center justify-between mt-2'>
            <div className='text-xs text-slate-500'>{tags.map((tag,index)=>`#${tag} `)}</div>
            <div className='flex items-center gap-2'>
                <MdCreate className='icon-btn hover:text-green-600' onClick={onEdit}/>
                <MdDelete className='icon-btn hover:text-red-500' onClick={onDelete}/>
            </div>
        </div>
    </div>
  )
}

export default NoteCard