import React from 'react';

function Header({ goToCreatePost, goToHomePage }) {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle} onClick={goToHomePage}>Ropauba</h1>
      <button style={buttonStyle} onClick={goToCreatePost}>Nueva Publicación</button>
    </header>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px',
  backgroundColor: '#00BFFF', // Color celeste
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

export default Header;
