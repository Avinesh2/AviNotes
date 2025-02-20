import React, { useEffect, useState } from 'react'
import NoteCard from '../../Components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'
import { ImCross } from "react-icons/im";
import AddEditNotes from './AddEditNotes';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import EmptyCard from '../../Components/Empty Cards/EmptyCard';

const Home = () => {
  const [allNotes,setAllNotes]=useState([])
  const {currentUser,loading,errorDispatch}=useSelector(state=>state.user)
  const [userInfo, setUserInfo] = useState(null)
  const [openEditModel, setOpenEditModel] = useState(
    {
      isShown: false,
      type: "add",
      data: null,
    }
  )
  const navigate=useNavigate()
  useEffect(() => {
    if(currentUser===null || !currentUser)
    {
      navigate('/login')
    }
    else{
      setUserInfo(currentUser?.user?.username)
      getAllNotes()
    }
  },[currentUser])
  const getAllNotes = async () => {
    try{
      const res=await axios.get("https://avinotes.onrender.com/api/note/all",{withCredentials:true})
      if(res.data.success)
      {
        setAllNotes(res.data.notes)
      }
      else{
        console.log(res.data.message)
        return
      }
    }
    catch(err)
    {
      console.log(err.message)
      
    }
  }
  const handleEdit=(noteDetails)=>{
    
    setOpenEditModel({ isShown: true, type: "edit", data: noteDetails })

  }
  const onDeleteNote=async(noteId)=>{
    try{
      const res=await axios.delete("https://avinotes.onrender.com/api/note/delete/"+noteId,{withCredentials:true})
      if(res.data.success)
      {
        toast.success(res.data.message)
        getAllNotes()
      }
      else{
        toast.error(res.data.message)
        console.log(res.data.message)
        return
      }
    }
    catch(err)
    {
      toast.error(err.message)
      console.log(err.message)
    }
  }
  


  return (
    <> {allNotes.length>0?(<div>
      <div className='container mx-auto p-10  bg-slate-100'>
        <div className='grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5'>
          {allNotes.map((item, index)=> <NoteCard key={item._id} title={item.title} date={item.createdAt} content={item.content}
            tags={item.tags} isPinned={item.isPinned} onPinNote={() => { }} onEdit={() => {handleEdit(item)  }} onDelete={() => {onDeleteNote(item._id) }} />)}
         
        


        </div>
      </div>
      <button className="absolute h-12 w-12 bottom-10 right-10 bg-primary hover:bg-blue-400 rounded-2xl cursor-pointer flex items-center justify-center" onClick={() => { setOpenEditModel({ isShown: true, type: "add", data: null }) }}>
        <MdAdd className="text-white text-2xl" />
      </button>
      <Modal isOpen={openEditModel.isShown}  contentLabel="" className={"flex justify-between w-[40%] max-md:w-[60%] max-sm:w-[80%] bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll h-5/6"} style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}>
      <AddEditNotes getAllNotes={getAllNotes} onClose={() => { setOpenEditModel({ isShown: false, type: "add", data: null })  }}  noteData={openEditModel.data} type={openEditModel.type} />
       <button className=" h-6 w-6 top-6 right-6 bg-primary hover:bg-blue-400 rounded-2xl cursor-pointer flex items-center justify-center" onClick={() => { setOpenEditModel({ isShown: false, type: "add", data: null }) }}><ImCross className='text-white text-xs' /></button>
       </Modal></div>)
       :
       <div><EmptyCard /><button className="absolute h-12 w-12 bottom-10 right-10 bg-primary hover:bg-blue-400 rounded-2xl cursor-pointer flex items-center justify-center" onClick={() => { setOpenEditModel({ isShown: true, type: "add", data: null }) }}>
        <MdAdd className="text-white text-2xl" />
      </button><Modal isOpen={openEditModel.isShown}  contentLabel="" className={"flex justify-between w-[40%] max-md:w-[60%] max-sm:w-[80%] bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll h-5/6"} style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}>
      <AddEditNotes getAllNotes={getAllNotes} onClose={() => { setOpenEditModel({ isShown: false, type: "add", data: null })  }}  noteData={openEditModel.data} type={openEditModel.type} />
       <button className=" h-6 w-6 top-6 right-6 bg-primary hover:bg-blue-400 rounded-2xl cursor-pointer flex items-center justify-center" onClick={() => { setOpenEditModel({ isShown: false, type: "add", data: null }) }}><ImCross className='text-white text-xs' /></button>
       </Modal></div>}
    </>
  )
}

export default Home