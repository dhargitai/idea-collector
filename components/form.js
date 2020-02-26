import React, { useState } from 'react';

const Form = ({reloadIdeas}) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit = () => text.trim().length > 0 && !isLoading;

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);

    if (text.trim() === '') {
      setIsLoading(false);
      return;
    }

    await fetch('/api/create-note', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    setText('');
    setIsLoading(false);
    reloadIdeas();
  };

  return (
    <form onSubmit={handleSubmit} className="idea-form">
      <h2 className="title is-3 has-text-centered">
        Add ideas
      </h2>
      <div className="field is-grouped is-block-mobile is-flex-tablet">
        <p className="control is-expanded">
          <textarea
            className="textarea"
            value={text}
            id="textarea"
            onChange={event => setText(event.target.value)}
          ></textarea>
        </p>
        <p className="control has-text-right">
          <button
            className={`button is-link is-large is-uppercase
              ${!canSubmit() ? 'is-static' : ''}
              ${isLoading ? 'is-loading' : ''}
            `}
            type="submit"
            id="ideaAddButton"
          >Save idea</button>
        </p>
      </div>

    </form>
  );
};

export default Form;