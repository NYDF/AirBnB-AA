// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink
        className='Become-host-button'
        exact to="/spots/new">Become a Host</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <button
        className='Become-host-button-nouser'
        onClick={() => { alert('You need to login or signup first') }}>Become a Host</button>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='nav-container-home'>
      <div className='nav-container-single'>
        <div id='nav-header'>

          <div id={location.pathname==='/'?'nav-left':'nav-left-single'}>
            <NavLink
            className='logo-text'
            exact to="/">SongBnB</NavLink>
          </div>

          <div id={location.pathname==='/'?'nav-right':'nav-right-single'}>
            {isLoaded && sessionLinks}
          </div>

        </div>
        <hr id={location.pathname==='/'?'space-line':'space-line-single'}></hr>
      </div>
    </div>
  );
}

export default Navigation;
