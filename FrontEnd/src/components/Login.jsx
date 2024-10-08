import React, { useState } from 'react';

function Login({ onLogin, goToHomePage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificación de credenciales (aquí podrías añadir la lógica real de autenticación)
    if (username === 'admin' && password === '1234') { // Cambia 'usuario' y 'contraseña' por los valores reales
      onLogin(username); // Llama a la función de inicio de sesión con el nombre de usuario
      setErrorMessage(''); // Limpia el mensaje de error
      goToHomePage(); // Redirigir a la página de inicio después del login
    } else {
      setErrorMessage('Credenciales incorrectas.'); // Muestra un mensaje de error
    }

    // Limpiar los campos de entrada
    setUsername('');
    setPassword('');
  };

  return (
    <div style={loginContainerStyle}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={loginFormStyle}>
        <input 
          type="text" 
          placeholder="Nombre de usuario" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" style={loginButtonStyle}>Iniciar Sesión</button>
      </form>
      {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
    </div>
  );
}

const loginContainerStyle = {
  padding: '20px',
};

const loginFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const loginButtonStyle = {
  backgroundColor: '#00BFFF',
  color: 'white',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
};

export default Login;
