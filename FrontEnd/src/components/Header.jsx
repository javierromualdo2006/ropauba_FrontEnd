import React, { useState } from 'react';
import Icono from '/public/UBA.svg.png';

function Header({ goToCreatePost, goToHomePage, goToLoginPage, user, onLogout, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(''); // State for login message

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm); // Llamar a la función de búsqueda con el término actual
    }
  };

  const handleCreatePostClick = () => {
    if (user) {
      goToCreatePost(); // Redirigir a crear publicación si está logueado
      setMessage(''); // Limpiar mensaje anterior
    } else {
      setMessage('Debes iniciar sesión para crear una publicación.'); // Mostrar mensaje si no está logueado
      setTimeout(() => {
        setMessage(''); // Limpiar el mensaje después de 5 segundos
      }, 5000);
    }
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle} onClick={goToHomePage}>
        <img
          src={Icono}
          alt="Icono"
          style={iconoStyle}
          onClick={goToHomePage} // Cambiar a goToHomePage al hacer clic en el icono
        />
        <span style={ropaStyle}>Ropa</span>
        <span style={ubaStyle}>UBA</span>
      </h1>
      <div style={buttonContainerStyle}>
        <input
          type="text"
          placeholder="Buscar publicaciones..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress} // Añadir el evento onKeyPress
          style={searchInputStyle}
        />
        <button style={buttonStyle} onClick={handleCreatePostClick}>Nueva Publicación</button>
        {message && <p style={{ color: 'red', margin: '0 10px' }}>{message}</p>} {/* Mostrar mensaje si es necesario */}

        {user ? (
          <>
            <span style={userStyle}>{user}</span>
            <button style={logoutButtonStyle} onClick={onLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <button style={loginButtonStyle} onClick={goToLoginPage}>Iniciar Sesión</button>
        )}
      </div>
    </header>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  background: 'linear-gradient(135deg, #00BFFF 50%, white 50%)',
};

const buttonContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const titleStyle = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  fontFamily: 'Impact, sans-serif',
  fontSize: '36px',
};

const ropaStyle = {
  color: 'white',
};

const ubaStyle = {
  color: '#00ddff',
};

const buttonStyle = {
  backgroundColor: '#fff',
  color: '#00BFFF',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
};

const loginButtonStyle = {
  ...buttonStyle,
  marginLeft: '10px',
};

const logoutButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  marginLeft: '10px',
};

const userStyle = {
  color: 'white',
  marginLeft: '10px',
};

const iconoStyle = {
  width: '60px',
  height: '60px',
  cursor: 'pointer',
  marginRight: '10px',
  alignSelf: 'center',
};

const searchInputStyle = {
  padding: '5px',
  borderRadius: '5px',
  border: '1px solid #00BFFF',
  marginRight: '10px', // Espacio entre el buscador y el botón "Nueva Publicación"
};

export default Header;
