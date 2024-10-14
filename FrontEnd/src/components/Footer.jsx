// Footer.jsx

import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>Contacto: info@tuempresa.com</p>
      <p>Teléfono: (123) 456-7890</p>
    </footer>
  );
}

const footerStyle = {
  position: 'fixed', // Posicionarlo de forma fija
  bottom: 0, // Al final de la ventana
  left: 0, // A la izquierda de la ventana
  right: 0, // A la derecha de la ventana
  backgroundColor: '#00BFFF', // Color de fondo del footer
  color: '#ffffff', // Color del texto
  textAlign: 'center', // Centrar el texto
  padding: '10px', // Espaciado interno
};

export default Footer;
