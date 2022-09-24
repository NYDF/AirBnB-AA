import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import DemoUserLogin from "../DemoUser";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-window">
      <h2 id='login-welcome'
      >Welcome Back</h2>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>

          <br></br>
          <input
            type="text"
            className="login-input-place"
            placeholder="  Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <br></br>
        </label>
        <label>

          <br></br>
          <input
            type="password"
            placeholder="  Password"
            className="login-input-place"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br></br>
        </label>
        <button
        className="log-in-button"
        type="submit">Log In</button>
      </form>
      <DemoUserLogin />
    </div>
  );
}

export default LoginForm;
