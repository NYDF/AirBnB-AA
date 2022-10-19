// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useLocation } from 'react-router-dom';
import './ProfileButton.css'
import userbutton from './userbutton.png'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className='profile-button-container'>
      <button className='profile-button' onClick={openMenu}>
        <img
        className="profile-button-img"
        src={userbutton} alt='userbutton'/>
      </button>

      {showMenu && (

        <ul className={location.pathname ==='/' || (location.pathname ==='/spotss/filter') || (location.pathname ==='/spotss/search') ? "profile-dropdown":'profile-dropdown-single'}>
          <li className="drop-down-item1">Welcome! {user.username}</li>
          <li className="drop-down-item1" id="drop-down-item-last">{user.email}</li>
          <li className="drop-down-item" id="drop-down-item-first" ><NavLink exact to="/spotss/current">Manage Your Spots</NavLink></li>
          <li className="drop-down-item"><NavLink exact to="/reviewss/current">Manage Your Reviews</NavLink></li>
          <li className="drop-down-item"><NavLink exact to="/bookings/current">Manage Your Bookings</NavLink></li>
          <hr></hr>
          <li className="drop-down-item-button">
            <button
            className="logout-button"
            onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
