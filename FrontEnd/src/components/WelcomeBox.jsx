// WelcomeBox.jsx

import React from 'react';



const WelcomeBox = () => {
  return (
    <div style={boxStyle}>
      <h2 style={textStyle}>
        ¡Bienvenido a <span style={highlightStyle}>Ropa</span>
        <span style={highlightColor}>UBA!</span>
      </h2>
    </div>
  );
};

// Estilos del recuadro
const boxStyle = {
  backgroundColor: '#b6ddf0', // Fondo celeste pastel
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  margin: '20px', // Margen para separar del resto
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para un efecto de profundidad
};

// Estilos del texto
const textStyle = {
  fontFamily: 'Impact, sans-serif', // Tipografía Impact
  fontSize: '24px',
  color: '#ffffff', // Color negro
  margin: 0,
};

// Estilos para "Ropa"
const highlightStyle = {
  color: '#ffffff', // Blanco
};

// Estilos para "UBA"
const highlightColor = {
  color: '#00ddff', // Color azul claro
};


export default WelcomeBox;
