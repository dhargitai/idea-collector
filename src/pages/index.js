import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from '../../components/note';
import Form from '../../components/form';

export default () => {
  const [status, setStatus] = useState('loading');
  const [notes, setNotes] = useState(null);

  const reloadIdeas = () => setStatus('loading');

  useEffect(() => {
    let canceled = false;
    if (status !== 'loading') {
      return;
    }

    axios('/api/get-all-notes').then(result => {
      if (canceled) {
        return;
      }

      if (result.status !== 200) {
        console.error('Error during loading ideas :(');
        console.error(result);
        return;
      }

      setNotes(result.data.notes);
      setStatus('loaded');

      return () => {
        canceled = true;
      };
    });
  }, [status]);

  return (
    <main>
      <h1>Idea Collector</h1>
      
      <Form reloadIdeas={reloadIdeas} />

      { notes ? (
        <ul>
          { notes.map(note => (
            <li key={note._id}>
              <Note note={note} reloadIdeas={reloadIdeas} />
            </li>
          )) }
        </ul>
      ) : (<p>Loading ideas...</p>) }
    </main>
  );
}