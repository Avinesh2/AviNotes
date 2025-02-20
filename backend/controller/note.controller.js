import { errorHandler } from "../utils/error.js";
import Note from "../models/note.model.js";
export const addNotes=async(req,res,next)=>{
    const {title,content,tags}=req.body;
    const {id}=req.user; //ye verifyuser.js set krrha hai
    if(!title || !content){
        return next(errorHandler(400,"All fields are required"))
    }
    try{
        const note=new Note({
            title,
            content,
            tags:tags || [],
            userId:id
        })
        await note.save();
        res.status(201).json({
            success:true,
            message:"Note added successfully",
            note
        })
    }
    catch(err){
        return next(errorHandler(500,err.message))
    }
};

export const editNotes=async(req,res,next)=>{
    const note=await Note.findById(req.params.id);
    if(!note){
        return next(errorHandler(404,"Note not found"))
    }
    if(note.userId!==req.user.id){
        return next(errorHandler(401,"You can only edit your own Notes"))
    }
    const {title,content,tags,isPinned}=req.body;
    if(!title && !content && !tags){
        return next(errorHandler(400,"Atleast one field is required to update"))
    }
    try{
        if(title){
            note.title=title;
        }
        if(content){
            note.content=content;
        }
        if(tags){
            note.tags=tags;
        }
        if(isPinned){
            note.isPinned=isPinned;
        }
        await note.save();
        res.status(200).json({
            success:true,
            message:"Note updated successfully",
            note
        })
    }
    catch(err){
        return next(errorHandler(500,err.message))
    }
}
export const getAllNotes=async(req,res,next)=>{
    const notes=await Note.find({userId:req.user.id}).sort({isPinned:-1});
    res.status(200).json({
        success:true,
        notes
    })
}
export const deleteNote=async(req,res,next)=>{
    const note=await Note.findById(req.params.id);
    if(!note){
        return next(errorHandler(404,"Note not found"))
    }
    if(note.userId!==req.user.id){
        return next(errorHandler(401,"You can only delete your own Notes"))
    }
    await  Note.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"Note deleted successfully"
    })
}   

export const searchNotes = async (req, res, next) => {
    const { query } = req.query
  
    if (!query) {
      return next(errorHandler(400, "Search query is required"))
    }
  
    try {
      const matchingNotes = await Note.find({
        userId: req.user.id,
        $or: [
          { title: { $regex: new RegExp(query, "i") } },
          { content: { $regex: new RegExp(query, "i") } },
        ],
      })
  
      res.status(200).json({
        success: true,
        message: "Notes matching the search query retrieved successfully",
        notes: matchingNotes,
      })
    } catch (error) {
      next(error)
    }
  }
