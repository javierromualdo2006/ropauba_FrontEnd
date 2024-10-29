import React, { useState } from 'react';

function Login({ onLogin, goToHomePage }) {
  const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login y registro
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    phone: '', 
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      // Lógica para registrarse
      const { email, firstName, lastName, username, password, confirmPassword } = formData;
      if (email && firstName && lastName && username && password && password === confirmPassword) {
        // Simulamos una creación de cuenta exitosa
        onLogin(username);
        setErrorMessage('');
        goToHomePage();
      } else {
        setErrorMessage('Por favor, complete todos los campos correctamente.');
      }
    } else {
      // Verificación de credenciales
      if (formData.username === 'admin' && formData.password === '1234') {
        onLogin(formData.username);
        setErrorMessage('');
        goToHomePage();
      } else {
        setErrorMessage('Credenciales incorrectas.');
      }
    }

    // Limpiar los campos de entrada
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div style={loginContainerStyle}>
      <h2>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h2>
      <form onSubmit={handleSubmit} style={loginFormStyle}>
        {isRegistering && (
          <>
            <input 
              type="email" 
              name="email" 
              placeholder="Email de usuario UBA" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="text" 
              name="firstName" 
              placeholder="Nombre" 
              value={formData.firstName} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="text" 
              name="lastName" 
              placeholder="Apellido" 
              value={formData.lastName} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="text" 
              name="username" 
              placeholder="Nombre de usuario" 
              value={formData.username} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="tel"  // Cambiar a tipo "tel"
              name="phone" // Cambiar a "phone" para que coincida
              placeholder="Número de Teléfono" 
              value={formData.phone} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Contraseña" 
              value={formData.password} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirmar contraseña" 
              value={formData.confirmPassword} 
              onChange={handleInputChange} 
              required 
            />
          </>
        )}
        {!isRegistering && (
          <>
            <input 
              type="text" 
              name="username" 
              placeholder="Nombre de usuario" 
              value={formData.username} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Contraseña" 
              value={formData.password} 
              onChange={handleInputChange} 
              required 
            />
          </>
        )}
        <button type="submit" style={loginButtonStyle}>
          {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
        </button>
      </form>
      {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
      <p style={toggleMessageStyle}>
        {isRegistering ? (
          <>
            ¿Ya tienes una cuenta? <span onClick={() => setIsRegistering(false)} style={linkStyle}>Inicia sesión</span>
          </>
        ) : (
          <>
            ¿No tienes cuenta? <span onClick={() => setIsRegistering(true)} style={linkStyle}>¡Regístrate!</span>
          </>
        )}
      </p>
    </div>
  );
}

const loginContainerStyle = {
  padding: '20px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url('https://resizer.glanacion.com/resizer/v2/el-colegio-de-lugano-que-depende-de-la-LUH2HGFRKVBTRLFKL5JJBMX2VY.jpg?auth=cc3a1a87a939ff1f85202d5283956f1bbe920bdde768a2b588a516cea3831b1d&width=780&height=439&quality=70&smart=true')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const loginFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '20px',
  borderRadius: '10px',
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

const toggleMessageStyle = {
  marginTop: '10px',
  color: 'white',
};

const linkStyle = {
  color: '#00BFFF',
  cursor: 'pointer',
};

export default Login;
