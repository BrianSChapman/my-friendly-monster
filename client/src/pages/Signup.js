import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    } catch (e) {
      console.error(e);
    }
  };

//    Need to Style this part 
  return (
    <main className="align-items-center flex-row justify-center mb-4 justify-content-center">
      <div className="signup-screen d-flex flex-column">
        <div className="signup-card my-1 border border-primary rounded">
        <Link to="/">← Go back to login</Link>
        <h2>Sign Up</h2>
          <div className="card-body-signup flex-row space-between my-2">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                  className="form-input space-between my-2"
                  placeholder="username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <label htmlFor="pwd">Password:</label>
                <input
                  className="form-input space-between"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="signup-btn btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
        <div>
      <img className="login-image" src={ben} alt="ben"/>
    </div>
      </div>
    </main>
  );
};

export default Signup;