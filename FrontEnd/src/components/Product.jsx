// Product.jsx

import React, { useState } from 'react';

function Product({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={productStyle}>
      <img src={product.image} alt={product.title} style={imageStyle} />
      <h3 style={titleStyle}>{product.title}</h3>
      <p style={priceStyle}>${product.price.toFixed(2)}</p>

      {/* Contenedor de la descripción con altura máxima fija y scroll */}
      <div style={{ ...descriptionContainerStyle, maxHeight: isExpanded ? '100px' : '50px' }}>
        <p style={descriptionStyle}>
          {product.description}
        </p>
      </div>

      {/* Botón de Ver más/Ver menos */}
      {product.description.length > 50 && (
        <button onClick={toggleDescription} style={toggleButtonStyle}>
          {isExpanded ? 'Ver menos' : 'Ver más'}
        </button>
      )}

      <button style={buttonStyle}>Comprar</button>
    </div>
  );
}

const productStyle = {
  border: '1px solid #ffffff',
  borderRadius: '10px',
  padding: '15px',
  backgroundColor: '#0088cc',
  color: '#000000', // Cambiar el color del texto a negro
  textAlign: 'center',
  width: '300px',
  margin: '0 auto',
  transition: 'transform 0.3s',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '10px',
};

const titleStyle = {
  fontSize: '20px',
  margin: '10px 0',
  fontFamily: 'Impact, sans-serif', // Usar tipografía Impact
  color: '#000000', // Asegurarse que el texto del título sea negro
};

const descriptionContainerStyle = {
  overflowY: 'auto',
  transition: 'max-height 0.3s ease-in-out',
  maxHeight: '50px',
  width: '100%',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
};

const descriptionStyle = {
  fontSize: '14px',
  margin: '10px 0',
  fontFamily: 'Impact, sans-serif', // Usar tipografía Impact
  color: '#000000', // Asegurarse que el texto de la descripción sea negro
};

const priceStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  fontFamily: 'Impact, sans-serif', // Usar tipografía Impact
  color: '#000000', // Asegurarse que el precio sea negro
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#ffffff',
  color: '#0088cc',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '16px',
};

const toggleButtonStyle = {
  backgroundColor: 'transparent',
  color: '#000000', // Asegurarse que el texto del botón de toggle sea negro
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px',
  textDecoration: 'underline',
};

export default Product;
