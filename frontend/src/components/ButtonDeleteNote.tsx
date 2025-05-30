import React from 'react';
import trashCan from '../assets/trash-can.png'

// Props recieved by the component
type DeleteButtonProps = {
  noteId: number; 
  onDelete: (id: number) => void; 
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ noteId, onDelete }) => {
  const handleClick = () => {
    console.log(noteId);
    onDelete(noteId);
  };

  return (
    <button
      onClick={handleClick}
      className="deleteButton"
    >
      <img src={trashCan} style= {{height:25, width:20}} alt="Trash can" />
    </button>
  );
};

export default DeleteButton;
