import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, deleteToken } from '../../reducers/userReducer';

export default function Header() {
  const { firstName, lastName, token, isChecked } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);

  useEffect(() => {
    const fetchUserData = async () => {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, config);
      const userData = response.data.body;
      dispatch(setUser(userData));
    };

    fetchUserData();
  }, [dispatch]);

  useEffect(() => {
      if (!isChecked) {
        window.addEventListener('beforeunload', dispatch(deleteToken()));
      }
  }, [isChecked, dispatch]);

  const handleEditClick = () => {
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
    setEditing(true);
  };

  const handleSaveClick = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      await axios.put('http://localhost:3001/api/v1/user/profile', { firstName: editedFirstName, lastName: editedLastName }, config);
      dispatch(setUser({ firstName: editedFirstName, lastName: editedLastName }));
      setEditing(false);
    } catch (error) {
      console.log('Error while saving user data:', error);
    }
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  return (
    <div className="header">
      {editing ? (
        <div className="edit-form">
          <h1>Welcome back</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder={editedFirstName}
              onChange={(e) => setEditedFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder={editedLastName}
              onChange={(e) => setEditedLastName(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button className="edit-button form-button" onClick={handleSaveClick}>Save</button>
            <button className="edit-button form-button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="user-info">
          <h1>Welcome back<br />{firstName} {lastName}!</h1>
          <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
        </div>
      )}
    </div>
  );
}
