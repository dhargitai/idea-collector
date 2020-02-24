import React, { useState } from 'react';
import axios from 'axios';

const Form = ({reloadIdeas}) => {
  const [text, setText] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    if (text.trim() === '') {
      return;
    }

    await axios.post('/api/create-note', { text });

    setText('');
    reloadIdeas();
  };

  return (
    <form onSubmit={handleSubmit} className="idea-form">
      <label htmlFor="textarea"> Add ideas
        <textarea value={text} id="textarea" onChange={event => setText(event.target.value)}></textarea>
      </label>

      <button type="submit" className="submitButton">Save idea</button>
    </form>
  );
};

export default Form;