import React from 'react';

function Header() {
  const goToHomePage = () => {
    window.location.href = '/'; // Redirige a la URL raíz
  };

  return (
    <header style={headerStyle}>
      <span onClick={goToHomePage} style={linkStyle}>ropauba</span>
      <input type="text" placeholder="Buscar productos..." style={searchStyle} />
    </header>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#00aaff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const linkStyle = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const searchStyle = {
  width: '300px',
  padding: '10px',
  backgroundColor: '#0088cc',
  border: '1px solid #ffffff',
  borderRadius: '20px',
  fontSize: '16px',
  color: '#ffffff',
};

export default Header;
