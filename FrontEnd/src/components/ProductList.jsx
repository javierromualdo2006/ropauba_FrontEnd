import React from 'react';
import Product from './Product';

const products = [
  {
    id: 1,
    title: 'Camiseta Azul',
    description: 'Camiseta de algodón 100%. Muy cómoda y ligera.',
    price: 19.99,
    image: 'https://example.com/image1.jpg', // Reemplaza con URL de imagen válida
  },
  {
    id: 2,
    title: 'Pantalones Negros',
    description: 'Pantalones de tela suave. Perfectos para cualquier ocasión.',
    price: 39.99,
    image: 'https://example.com/image2.jpg', // Reemplaza con URL de imagen válida
  },
  {
    id: 3,
    title: 'Chaqueta de Cuero',
    description: 'Chaqueta de cuero genuino. Estilo y confort.',
    price: 79.99,
    image: 'https://example.com/image3.jpg', // Reemplaza con URL de imagen válida
  },
  {
    id: 4,
    title: 'Zapatos Deportivos',
    description: 'Zapatos cómodos para cualquier actividad.',
    price: 49.99,
    image: 'https://example.com/image4.jpg', // Reemplaza con URL de imagen válida
  },
];

function ProductList() {
  return (
    <div style={productListStyle}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

const productListStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around', // Espacio entre las tarjetas
  padding: '20px',
};

export default ProductList;
