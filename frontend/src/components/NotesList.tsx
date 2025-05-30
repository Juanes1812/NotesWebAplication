import { useState, useEffect } from 'react';
import { deleteNote } from '../services/notesApi';
import { getCategories } from '../services/categoriesApi';
import DeleteButton from './ButtonDeleteNote';
import UpdateButton from './ButtonUpdateNote';
import UpdateModal from './UpdateModal';
import ToggleArchivedButton from './ToggleArchivedButton';
import '../styles/notesList.css'

interface NoteListProps {
  notes: {
    id: number;
    title: string;
    content: string;
    archived: boolean;
    categoryId: number;
  }[];
  refreshNotes: () => void;
}

interface Category {
  id: number;
  name: string;
  color: string;
}

export const NotesList: React.FC<NoteListProps> = ({ notes, refreshNotes }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filteredNotes, setFilteredNotes] = useState(notes);


  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);

    } catch {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteNote = async (noteId: number) => {
    try {
      await deleteNote(noteId);
      console.log(`Note with id ${noteId} deleted.`);
      refreshNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const openModal = (note: any) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  useEffect(() => {
    const unarchivedNotes = notes.filter((note) => !note.archived);
    setFilteredNotes(unarchivedNotes);
  }, [notes]);

  const filterNotes = (showArchived: boolean) => {
    const filtered = notes.filter((note) => note.archived === showArchived);
    setFilteredNotes(filtered);
  };

  const getCategoryDetails = (categoryId: number) => {
    return categories.find((category) => category.id === categoryId);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <div className="containerNoteList">
        <h2>Notes</h2>

        <div className="rowCreationArchivedButton">
          <button onClick={() => filterNotes(false)}>Show Active</button>
          <button onClick={() => filterNotes(true)}>Show Archived</button>
        </div>

        {filteredNotes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          <div>
            {filteredNotes.map((note) => {
              const category = getCategoryDetails(note.categoryId);

              return (
                <div key={note.id} className="rowCreationNoteList" style={{ backgroundColor: category ? category.color : 'defaultColor' }}>
                  <div>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <p>{note.archived ? 'Archived' : 'Active'}</p>
                    {category ? (
                      <p >
                        {category.name}
                      </p>
                    ) : (
                      <p>Category not found</p>
                    )}
                  </div>
                  <div className="buttonsNotesList">
                    <ToggleArchivedButton note={note} refreshNotes={refreshNotes}/>
                    <UpdateButton noteId={note.id} onUpdate={() => openModal(note)}  />
                    <DeleteButton noteId={note.id} onDelete={handleDeleteNote} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {isModalOpen && selectedNote && (
          <UpdateModal note={selectedNote} closeModal={closeModal} categories={categories} refreshNotes={refreshNotes} />
        )}
      </div>
    </div>

  );
};


