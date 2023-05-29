import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../reducers/userReducer';

export default function Header() {
    const { firstName, lastName } = useSelector(state => state.user);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchUserData = async () => {
        const config = {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
          }
        };
        const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, config);
        const userData = response.data.body;
        dispatch(setUser(userData));
      };
      fetchUserData();
    }, [dispatch]);

  return (
    <div className="header">
        <h1>Welcome back<br />{firstName} {lastName}!</h1>
        <button className="edit-button">Edit Name</button>
    </div>
  );
}
