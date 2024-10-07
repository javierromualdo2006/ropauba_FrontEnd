import React from 'react';

function Product({ product }) {
  return (
    <div style={productStyle}>
      <img src={product.image} alt={product.title} style={imageStyle} />
      <h3 style={titleStyle}>{product.title}</h3>
      <p style={descriptionStyle}>{product.description}</p>
      <p style={priceStyle}>${product.price.toFixed(2)}</p>
      <button style={buttonStyle}>Comprar</button>
    </div>
  );
}

const productStyle = {
  border: '1px solid #ffffff', // Borde blanco
  borderRadius: '10px',
  padding: '15px',
  backgroundColor: '#0088cc', // Fondo celeste
  color: '#ffffff', // Texto blanco
  textAlign: 'center',
  transition: 'transform 0.3s',
};

const imageStyle = {
  width: '100%', // Imágenes a tamaño completo
  height: '200px',
  objectFit: 'cover', // Mantener la proporción
  borderRadius: '10px',
};

const titleStyle = {
  fontSize: '20px',
  margin: '10px 0',
};

const descriptionStyle = {
  fontSize: '14px',
  margin: '10px 0',
};

const priceStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#ffffff', // Fondo blanco
  color: '#0088cc', // Texto celeste
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default Product;
