import React from 'react';
import changeCircle from '../assets/change-circle.png'

// Props recieved by the component
type UpdateButtonProps = {
  noteId: number;
  onUpdate: (id: number) => void; 
};

const UpdateButton: React.FC<UpdateButtonProps> = ({ noteId,  onUpdate }) => {
  const handleClick = () => {
    console.log('Id to update:', noteId);
    onUpdate(noteId);
  };

  return (
    <button
      onClick={handleClick}
      className="updateButton"
    >
      <img src={changeCircle} style= {{height:25, width:25}} alt="Change circle" />
    </button>
  );
};

export default UpdateButton;
