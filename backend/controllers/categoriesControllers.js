import { Category } from "../models/models.js";

// Create a Category
export const createCategory = async (req, res) => {
    const { name, color } = req.body;
    try {
      const category = await Category.create({ name, color });
      res.status(201).json(category); 
    } catch (error) {
      res.status(500).json({ error: 'Error creating category', details: error.message });
    }
  };
  
  // Get all Categories
  export const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories); 
    } catch (error) {
      res.status(500).json({ error: 'Error getting categories', details: error.message });
    }
  };

  //Delete Category
  export const deleteCategory = async (req, res) => {
    const { id } = req.params; 
    try{
        // Searhc Category by ID
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: `Category with ID ${id} not found` });
        }

        // Delete Category
        await Category.destroy();

        return res.status(200).json({ message: 'Category deleted successfully' });

    }catch (error) {
        console.error(`Error deleting Category with ID ${id}:`, error);
        return res.status(500).json({ message: "Internal server error" });
    }
  }
