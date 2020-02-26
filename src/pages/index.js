import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IdentityModal, { useIdentityContext } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css'
import Note from '../../components/note';
import Form from '../../components/form';
import { IconContext } from "react-icons";
import { FaLightbulb } from 'react-icons/fa';
import './index.scss';

export default () => {
  const [status, setStatus] = useState('loading');
  const [notes, setNotes] = useState(null);

  const reloadIdeas = () => setStatus('loading');

  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);
  const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || 'NoName';
  const isLoggedIn = identity && identity.isLoggedIn;

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
            
            {identity && identity.isLoggedIn ? (

              <>
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
              </>

            ) : (

              <>
                <div className="has-text-centered">
                    <button className="button is-link is-large is-uppercase" onClick={() => setDialog(true)}>
                    {isLoggedIn ? `Hey ${name}, log out here` : 'Log in'}
                  </button>
                  
                  {!isLoggedIn ? (
                    <p id="loginDetails">Use <strong>demo@test.com</strong> as email and <strong>demotest</strong> as password.</p>
                  ) : ''}
                </div>
              </>

            )}

          </div>

        </div>
      </main>

      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
    </section>
  );
}