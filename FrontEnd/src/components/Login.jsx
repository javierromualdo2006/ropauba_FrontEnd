import React, { useState } from 'react';

function Login({ onLogin, goToHomePage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificación de credenciales
    if (username === 'admin' && password === '1234') { 
      onLogin(username); 
      setErrorMessage('');
      goToHomePage(); 
    } else {
      setErrorMessage('Credenciales incorrectas.');
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
  height: '100vh', // Asegúrate de que el contenedor ocupe toda la altura de la ventana
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url('https://resizer.glanacion.com/resizer/v2/el-colegio-de-lugano-que-depende-de-la-LUH2HGFRKVBTRLFKL5JJBMX2VY.jpg?auth=cc3a1a87a939ff1f85202d5283956f1bbe920bdde768a2b588a516cea3831b1d&width=780&height=439&quality=70&smart=true')`,
  backgroundSize: 'cover', // Asegúrate de que la imagen cubra todo el fondo
  backgroundPosition: 'center', // Centra la imagen
  backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
};

const loginFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco semi-transparente para el formulario
  padding: '20px', // Espaciado interno del formulario
  borderRadius: '10px', // Bordes redondeados
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
