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
      <div className="field">
        <label className="label">Add ideas</label>
      </div>
      <div className="field is-grouped">
        <p className="control is-expanded">
          <textarea
            className="textarea"
            value={text}
            id="textarea"
            onChange={event => setText(event.target.value)}
          ></textarea>
        </p>
        <p className="control">
          <button
            className="button is-link is-large"
            type="submit"
            id="ideaAddButton"
          >Save idea</button>
        </p>
      </div>

    </form>
  );
};

export default Form;