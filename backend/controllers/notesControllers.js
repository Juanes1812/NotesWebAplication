import { Note } from "../models/models.js";

// Create a Note
export const createNote = async (req, res) => {
    const { title, content, archived, categoryId } = req.body;
    try {
        const note = await Note.create({ title, content, archived, categoryId });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: 'Error creating note', details: error.message });
    }
};

// Get all Notes
export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.findAll();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Error getting notes', details: error.message });
    }
};

//Get Note by Category
export const getNotesByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const notes = await Note.findAll({ where: { categoryId } });

        // If there is no Notes found
        if (!notes || notes.length === 0) {
            return res.status(404).json({ message: `No notes found for category: ${categoryId}` });
        }

        return res.status(200).json(notes);
    } catch (error) {
        console.error(`Error getting notes for category: ${categoryId}:`, error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


//Update a Note
export const editNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, archived, categoryId } = req.body; 

    try {
        // Search by ID
        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ message: `Note with ID ${id} not found` });
        }

        // Update data
        await note.update({ title, content, archived, categoryId });

        return res.status(200).json({ message: 'Note updated successfully', note });
    } catch (error) {
        console.error(`Error updating note with ID ${id}:`, error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//Delete a Note 
export const deleteNote = async (req, res) => {
    const { id } = req.params; 

    try {
        // Search Note by ID
        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ message: `Note with ID ${id} not found` });
        }

        // Delete Note
        await note.destroy();

        return res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(`Error deleting note with ID ${id}:`, error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


//Toggle Status of the atribute 'archived'
export const toggleArchivedStatus = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const note = await Note.findByPk(id); 
  
      if (!note) {
        return res.status(404).json({ message: `Note with ID ${id} not found` });
      }
  
      // invert current value
      const updatedArchivedStatus = !note.archived;
  
      // Update the status of 'archived'
      await note.update({ archived: updatedArchivedStatus });
      return res.status(200).json({ message: `Note with ID ${id} updated successfully`, note});
      
    } catch (error) {
      console.error(`Error updating archived status for note with ID ${id}:`, error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  