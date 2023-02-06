import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import ben from './assets/ben.gif';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      // redirect("/dashboard");

    } catch (e) {
      console.error(e);
    }
  };
 
  return (

    <div className='login-screen justify-content-center d-flex flex-column' >
      <div className="my-5 rounded" id="signup-box">
        <h2 className="loginTitle text-center">Sign Up</h2>
        {/* {data ? (
          <p>
            Success! You may now head{' '}
            <Link to="/">back to the homepage.</Link>
          </p>
        ) : null} */}
        <form onSubmit={handleFormSubmit} className="loginForm text-center">
          <div className="flex-row space-between my-2">
            <input
              className="loginInput"
              placeholder="Username"
              name="username"
              type="text"
              value={formState.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex-row space-between my-2">
            <input
              className="loginInput"
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          {error ? (
            <div>
              <p className="error-text">You must provide a username and a password at least 5 characters long.</p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <button
              className="btn btn-block m-2 signBtn"
              style={{ cursor: 'pointer' }}
              type="submit"
            >
              Sign Up
            </button>
            <Link to="/"><button
                className="btn btn-block m-2 logBtn"
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Log In
              </button></Link>
          </div>
        </form>

      </div>
      <div>
        <img className="login-image" src={ben} alt="ben" />
      </div>
      </div>
      );
};

export default Signup;