import React from 'react';

function Header({ goToCreatePost, goToHomePage, goToLoginPage, user, onLogout }) {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle} onClick={goToHomePage}>Ropauba</h1>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={goToCreatePost}>Nueva Publicación</button>
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
  alignItems: 'center', // Alinear verticalmente en el centro
  padding: '10px',
  backgroundColor: '#00BFFF', // Color celeste
};

const buttonContainerStyle = {
  display: 'flex',
  alignItems: 'center', // Alinear los botones al centro
};

const titleStyle = {
  color: 'white',
  cursor: 'pointer',
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
  backgroundColor: '#fff',
  color: '#00BFFF',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  marginLeft: '10px', // Espacio a la izquierda
};

const logoutButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  marginLeft: '10px', // Espacio a la izquierda
};

const userStyle = {
  color: 'white',
  marginLeft: '10px',
};

export default Header;
