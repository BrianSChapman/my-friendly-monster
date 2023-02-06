import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import beety from './assets/beety.gif';

function Login(props) {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { username: formState.username, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.loggedIn(token);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <div className='login-screen justify-content-center d-flex flex-column' >
      <div className="my-5 rounded" id="login-box">
        <h2 className="loginTitle text-center">Welcome!</h2>
        <form onSubmit={handleFormSubmit} className="loginForm text-center">
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="username" className="formLbl">Username:</label> */}
            <input
              placeholder="Username"
              name="username"
              type="username"
              id="username"
              className="loginInput"
              onChange={handleChange}
            />
          </div>

          <div className="flex-row space-between my-2">
            {/* <label htmlFor="pwd" className="formLbl">Password:</label> */}
            <input
              placeholder="Password"
              name="password"
              type="password"
              id="pwd"
              className="loginInput"
              onChange={handleChange}
            />
          </div>
          {error ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <button
              className="btn btn-block m-2 me-3 btn-primary logBtn"
              style={{ cursor: 'pointer' }}
              type="submit"
            >
              Log In
            </button>
            <Link to="/signup"><button
              className="btn btn-block btn-primary signBtn"
              style={{ cursor: 'pointer' }}
              type="submit"
            >
              Sign Up
            </button></Link>
          </div>
        </form>

      </div>
      <div>
        <img className="login-image" src={beety} alt="beety" />
      </div>
    </div>

  );
}
export default Login;