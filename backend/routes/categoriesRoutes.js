import express from "express";
import { createCategory, deleteCategory, getAllCategories } from "../controllers/categoriesControllers.js"; 

const categoriesRouter = express.Router();

// Rutas de categorías
categoriesRouter.post("/", createCategory);  // POST /categories
categoriesRouter.get("/", getAllCategories);  // GET /categories
categoriesRouter.delete("/:id", deleteCategory); // DELETE /categories/:id

export default categoriesRouter;
