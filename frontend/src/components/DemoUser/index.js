// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './DemoUser.css'


function DemoUserLogin() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const credential = 'fake1@user.io'
    const password = 'password'

    return dispatch(sessionActions.login({ credential, password }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className='demo-user-login-button' type="submit">Demo User Login</button>
    </form>
  );
}

export default DemoUserLogin;
