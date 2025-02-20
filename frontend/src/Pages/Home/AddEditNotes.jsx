import React from 'react'
import { useState } from 'react'
import TagInput from '../../Components/Cards/TagInput'
import axios from 'axios'
import { toast } from 'react-toastify'
const AddEditNotes = ({ onClose,noteData,type,getAllNotes}) => {
    const [title, setTitle] = useState(noteData?.title || '')
    const [content, setContent] = useState(noteData?.content || '')
    const [tags, setTags] = useState(noteData?.tags||[])
    const [error, setError] = useState('')
    const editNote= async()=>{
        try{
            const noteId=noteData._id
            const res=await axios.put("http://localhost:3000/api/note/edit/"+noteId,{title,content,tags},{withCredentials:true})
            if(res.data.success)
            {
                toast.success(res.data.message)
                getAllNotes()
                onClose()
            }
            else
            {
                toast.error(res.data.message)
                setError(res.data.message)
            }
        }
        catch(err){
            toast.error(err.message)
            setError(err.message)
        }
    }
    const addNote= async()=>{
        try{
            const res=await axios.post("http://localhost:3000/api/note/add/",{title,content,tags},{withCredentials:true})
            if(res.data.success)
            {
                toast.success(res.data.message)
                getAllNotes()
                onClose()
            }
            else
            {
                toast.error(res.data.message)
            }
        }
        catch(err){
            toast.error(err.message)
            setError(err.message)
        }
        
    }
    const handleAddNote = () => {
        if (!title || !content) {
            setError('Title and Content is required')
            return

        }
        setError('')

        if (type =="edit") {
            editNote()
        }
        else
        {
            addNote()
        }



    }
    return (
        <div className='flex flex-col gap-3  w-full'>
            <label className='input-label text-blue-400 uppercase'>title</label>
            <input type='text' placeholder='Type Title' className='text-2xl text-slate-950 outline-none' value={title} onChange={(e) => setTitle(e.target.value)} />

            <label className='input-label text-blue-400 uppercase'>content</label>
            <textarea value={content} placeholder='Type Your Content' className='p-4 w-full bg-slate-100  rounded h-40 text-slate-950 outline-none' onChange={(e) => setContent(e.target.value)} />
            <div className='flex flex-col gap-4'>
                <label className='input-label text-blue-400 uppercase'>Tags</label>
                <TagInput tags={tags} setTags={setTags}/>
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <button className='btn-primary font-medium  p-3' onClick={handleAddNote}>{type=="edit"?"EDIT":"ADD"}</button>
           

        </div>
    )
}

export default AddEditNotes