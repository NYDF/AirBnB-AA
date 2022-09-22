// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink exact to="/spots/new">Become a Host</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <button onClick={()=>{alert('You need to login or signup first')}}>Become a Host</button>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div id='nav-header'>

      <div id='nav-left'>
        <NavLink exact to="/">SongBnB</NavLink>
        </div>

        <div id='nav-right'>
        {isLoaded && sessionLinks}
      </div>

    </div>
  );
}

export default Navigation;
