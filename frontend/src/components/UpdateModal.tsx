import '../styles/modal.css'
import { useState } from 'react';
import { editNote } from '../services/notesApi.js';


type ModalProps = {
  note: { id: number; title: string; content: string; categoryId: number; Archived: boolean };
  closeModal: () => void;
  categories: { id: number; name: string; color: string }[];
  refreshNotes: () => void;
};

const Modal: React.FC<ModalProps> = ({ note, closeModal, categories, refreshNotes }) => {
  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);
  const [archived, setArchived] = useState<boolean>(note.Archived);
  const [categoryId, setCategoryId] = useState<number>(note.categoryId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const editedNote = { title, content, archived, categoryId: Number(categoryId) };

    try {
      const updatedNote = await editNote(note.id, editedNote);
      console.log('Note updated successfully:', updatedNote);
      refreshNotes();
      closeModal();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <h2>Edit Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="attributeBoxNoteModal">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="attributeBoxNoteModal">
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="attributeBoxNoteModal">
            <label>Archive:</label>
            <input
              type="checkbox"
              checked={archived}
              onChange={(e) => setArchived(e.target.checked)}
            />
          </div>
          <div className="attributeBoxNoteModal">
            <label>Category:</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="buttonSubmitModal">
            <button type="submit">Save Changes</button>
          </div>
        </form>

        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
