import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/login', { username, password });
      console.log(response);
      localStorage.setItem('token', response.data.token);
      console.log('Token stored in localStorage:', localStorage.getItem('token'));
      setAuth(true);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
      console.error(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8 text-center">
          <h2>Welcome to Expense Tracker!</h2>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                <button type="submit" className="btn btn-primary mt-4 w-100">Login</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <button
                onClick={() => navigate('/signup')}
                className="btn btn-link"
              >
                New user? Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
