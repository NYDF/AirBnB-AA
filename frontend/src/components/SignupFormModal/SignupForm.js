import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import DemoUserLogin from "../DemoUser";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser?.hasOwnProperty('id')) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-window-container">
      <div className="signup-window">
        <h2 className="signup-h2">Sign Up</h2>
        <hr></hr>
        <form
          className="signup-form-window"
          onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            <br></br>
            <input
              className="signp-form-input-place"
              placeholder="  Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br></br>
          <label>
            <br></br>
            <input
              className="signp-form-input-place"
              type="text"
              placeholder="  Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br></br>
          <label>
            <br></br>
            <input
              className="signp-form-input-place"
              type="text"
              placeholder="  firstName"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              required
            />
          </label>
          <br></br>
          <label>
            <br></br>
            <input
              className="signp-form-input-place"
              type="text"
              placeholder="  lastName"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
            />
          </label>
          <br></br>
          <label>

            <br></br>
            <input
              className="signp-form-input-place"
              type="password"
              placeholder="  Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br></br>
          <label>

            <br></br>
            <input
              className="signp-form-input-place"
              type="password"
              placeholder="  Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <br></br>
          <button
            className="sign-up-button1"
            type="submit">Sign Up</button>
        </form>
        <DemoUserLogin />
      </div>
    </div>
  );
}

export default SignupFormPage;
