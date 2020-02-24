import React from 'react';
import DeleteButton from '../components/deleteButton';

const Note = ({ note, reloadIdeas }) => {
  return (
    <>
      <p>{note.text}</p>
      <DeleteButton note={note} reloadIdeas={reloadIdeas} />
    </>
  )
}

export default Note;