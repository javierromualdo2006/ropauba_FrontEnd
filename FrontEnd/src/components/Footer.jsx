import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#00BFFF', // Color de fondo
    color: '#ffffff', // Color del texto
    textAlign: 'center', // Centrar el texto
    padding: '20px', // Espaciado alrededor del contenido
    position: 'relative', // Asegura que se coloque correctamente
    bottom: 0, // Asegura que esté en la parte inferior
    width: '100%', // Asegura que ocupe todo el ancho
    boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.3)', // Sombra para un efecto de separación
  };

  return (
    <footer style={footerStyle}>
      <p>© {new Date().getFullYear()} Tu Nombre. Todos los derechos reservados.</p>
      <div>
        <a href="/terms" style={{ color: '#646cff', marginRight: '15px' }}>Términos de Servicio</a>
        <a href="/privacy" style={{ color: '#646cff' }}>Política de Privacidad</a>
      </div>
    </footer>
  );
};

export default Footer;
