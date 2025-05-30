import React, { useState } from 'react';
import { editArchived } from '../services/notesApi.js'; 
import eye from '../assets/eye.png'

interface Note {
  id: number;
  title: string;
  archived: boolean;
}

interface ToggleArchivedButtonProps {
  note: Note; 
  refreshNotes: () => void; 
}

const ToggleArchivedButton: React.FC<ToggleArchivedButtonProps> = ({ note, refreshNotes }) => {
  const [loading, setLoading] = useState(false);


  const handleToggleArchived = async () => {
    try {
      setLoading(true);
      await editArchived(note.id);
      refreshNotes();
    } catch (error) {
      console.error('Error changing archived status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleToggleArchived} disabled={loading}>
        <img src={eye} style= {{height:25, width:25}} alt="eye" />
      </button>
    </div>
  );
};

export default ToggleArchivedButton;
