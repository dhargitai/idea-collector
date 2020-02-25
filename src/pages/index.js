import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from '../../components/note';
import Form from '../../components/form';
import { IconContext } from "react-icons";
import { FaLightbulb } from 'react-icons/fa';
import './index.scss';

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
    <section className="section">
      <main className="container">
        <div className="columns is-centered">

          <div className="column is-8">
            <h1 className="title is-1 has-text-centered">
              Idea Collector 
              <IconContext.Provider value={{ color: "#ffaa22" }}><FaLightbulb /></IconContext.Provider>
            </h1>
            
            <Form reloadIdeas={reloadIdeas} id="insertForm" />

            {notes ? (
              <ul>
                {notes.map(note => (
                  <li key={note._id}>
                    <Note note={note} reloadIdeas={reloadIdeas} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="has-text-centered">
                  <p>Loading ideas...</p>
                  <progress className="progress is-large is-info" max="100">60%</progress>
              </div>
            )}
          </div>

        </div>
      </main>
    </section>
  );
}