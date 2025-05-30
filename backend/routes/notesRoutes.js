import express from "express";
import { createNote, getAllNotes, editNote, deleteNote, getNotesByCategory, toggleArchivedStatus } from "../controllers/notesControllers.js";

const notesRouter = express.Router();


notesRouter.post("/", createNote); //POST /notes
notesRouter.get("/", getAllNotes); //GET /notes
notesRouter.get("/:categoryId", getNotesByCategory); // GET to filter by category
notesRouter.put("/:id", editNote); // PUT to update
notesRouter.put("/archive/:id", toggleArchivedStatus); // PUT to change Archived Status
notesRouter.delete("/:id", deleteNote); // DELETE to delete


export default notesRouter;
