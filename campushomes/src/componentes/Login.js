// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/loginusers', { username, password });
      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <input type="text" placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default Login;
