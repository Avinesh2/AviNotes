import express from 'express';
import { verifyToken } from "../utils/verifyUser.js";
import { addNotes, deleteNote, getAllNotes, searchNotes } from '../controller/note.controller.js';
import { editNotes } from '../controller/note.controller.js';


const router= express.Router();

router.post('/add',verifyToken,addNotes);
router.put('/edit/:id',verifyToken,editNotes);
router.get('/all',verifyToken,getAllNotes);
router.delete('/delete/:id',verifyToken,deleteNote);
router.get('/search',verifyToken,searchNotes);
export default router