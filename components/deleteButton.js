import React from 'react';
import axios from 'axios';

const DeleteButton = ({ note, reloadIdeas }) => {
  const handleDelete = async () => {
    await axios.post('/api/delete-note', { id: note._id });

    reloadIdeas();
  }

  return (
    <button onClick={handleDelete}>(X)</button>
  );
};

export default DeleteButton;