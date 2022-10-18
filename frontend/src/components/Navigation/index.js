// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SearchBar from '../SearchFunction/SearchBar';
import './Navigation.css';

function Navigation({ isLoaded,searchFunc }) {
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()
  // console.log(sessionUser)
  const sessionData = useSelector(state => state.session);
  const value = Object.values(sessionData)
  // console.log("sessionData!!!", sessionData)
  // console.log("value!!!", value)
  // console.log("searchFunc!!!", searchFunc)
  let sessionLinks;


  if (sessionUser?.hasOwnProperty('id')) {
    sessionLinks = (
      <>
        <NavLink
          className='Become-host-button'
          exact to="/spots/new">Become a Host</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  }

  else {
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

          <div id={(location.pathname === '/') || (location.pathname ==='/spotss/filter') || (location.pathname ==='/spotss/search') ? 'nav-left' : 'nav-left-single'}>
            <NavLink
              className='logo-text'
              exact to="/">SongBnB</NavLink>

            <div className='search-bar-div'>
              <SearchBar searchFunc={searchFunc} />
            </div>
          </div>

          <div id={(location.pathname === '/') || (location.pathname ==='/spotss/filter') || (location.pathname ==='/spotss/search') ? 'nav-right' : 'nav-right-single'}>
            {isLoaded && sessionLinks}
          </div>

        </div>
        <hr id={(location.pathname === '/') || (location.pathname ==='/spotss/filter') || (location.pathname ==='/spotss/search') ? 'space-line' : 'space-line-single'}></hr>
      </div>
    </div>
  );
}

export default Navigation;
