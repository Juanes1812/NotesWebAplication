import axios from 'axios'

//Api configuration with axios
const api = axios.create({
    baseURL: 'http://localhost:3000/notes',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  //get Notes
 const getNotes = async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  };

  //
 const createNote = async (noteData) => {
    try {
      const response = await api.post('/', noteData);
      return response.data;
    } catch (error) {
      console.error('Error creating Note:', error);
      throw error;
    }
  };

 //Update a Note
 const editNote = async (noteId, noteData) => {
  try {
    const response = await api.put(`/${noteId}`, noteData);
    return response.data;
    } catch (error){
      console.error('Error editing Note:', error);
      throw error;
    }
  }; 

  //Edit status
  export const editArchived = async (noteId ) => {
    try {
      const response = await api.put(`/archived/${noteId}`);
      return response.data;
      } catch (error){
        console.error('Error editing Archived:', error);
        throw error;
      }
    }; 

  //Delete a Note
  const deleteNote = async (noteId) => {
    try{
      const response = await api.delete(`/${noteId}`);
      return response.data;
    } catch (error){
      console.error('Error deleting Note: ', error);
      throw error;
    }
  };

  export { getNotes, createNote, deleteNote, editNote };


