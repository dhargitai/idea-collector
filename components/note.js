import React from 'react';
import DeleteButton from '../components/deleteButton';

const Note = ({ note, reloadIdeas }) => {
  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p className="subtitle is-5">
              {note.text}
            </p>
          </div>
        </div>

        <div className="media-right">
          <DeleteButton note={note} reloadIdeas={reloadIdeas} />
        </div>
      </article>
    </div>
    )
}
    
export default Note;