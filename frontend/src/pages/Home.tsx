import '../styles/Home.css'
import { CreateCategory } from '../components/CreateCategory'
import { CreateNote } from '../components/CreateNote'
import { NotesList } from '../components/NotesList'
import { getNotes } from '../services/notesApi'
import { useEffect, useState } from 'react'

interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  categoryId: number;
}

export const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);


  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);  
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);


  const refreshNotes = () => {
    fetchNotes();
  };

  return (
    <>
      <div className='rowCreation'>
        <CreateNote refreshNotes={refreshNotes}/>
        <CreateCategory />
      </div>

      <NotesList notes={notes} refreshNotes={refreshNotes}/>
    </>
  )
}
