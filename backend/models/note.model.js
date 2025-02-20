import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags:{
        type:[String],
        default:[],
        required:true
    },
    isPinned:{
        type:Boolean,
        default:false
    },
    userId:{
        type:String,
        req: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Note = mongoose.model("Note", NoteSchema);
export default Note;