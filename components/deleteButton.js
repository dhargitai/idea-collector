import React, {useState} from 'react';
import axios from 'axios';
import { IconContext } from "react-icons";
import { FaTimesCircle } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';

const DeleteButton = ({ note, reloadIdeas }) => {
  const [underDelete, setUnderDelete] = useState(false);
  const handleDelete = async () => {
    setUnderDelete(true);
    await axios.post('/api/delete-note', { id: note._id });
    reloadIdeas();
  }

  return (
    underDelete
      ? <IconContext.Provider value={{ className: 'icon icon-spin is-medium' }}>
        <FaCog />
      </IconContext.Provider> 
      : <IconContext.Provider value={{ className: 'icon has-text-danger is-medium deleteButton' }}>
        <FaTimesCircle onClick={handleDelete} />
      </IconContext.Provider>
  );
};

export default DeleteButton;