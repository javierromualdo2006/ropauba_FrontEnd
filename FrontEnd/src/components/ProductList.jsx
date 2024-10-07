import React from 'react';

function ProductList({ products, updateProductStatus, changeProductStatus }) {
  return (
    <div style={productListStyle}>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        products.map((product, index) => (
          <div key={index} style={productCardStyle}>
            <img src={product.image} alt={product.title} style={imageStyle} />
            <div style={infoStyle}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Precio: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Estado: 
                <select value={product.status} onChange={(e) => changeProductStatus(index, e.target.value)}>
                  <option value="pendiente">Pendiente</option>
                  <option value="pagado">Pagado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </p>
              <button 
                style={buttonStyle}
                onClick={() => updateProductStatus(index)} 
                disabled={product.stock <= 0}
              >
                Comprar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const productListStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // 3 columnas en cada fila
  gap: '20px', // Espacio entre las tarjetas
  padding: '20px', // Espaciado alrededor del grid
};

const productCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #00BFFF',
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: '#fff',
  alignItems: 'center', // Centrar el contenido de las tarjetas
  justifyContent: 'space-between',
};

const imageStyle = {
  width: '120px', // Tamaño ajustado de la imagen
  height: '120px',
  marginBottom: '10px',
};

const infoStyle = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: '14px',
  textAlign: 'center',
};

const buttonStyle = {
  backgroundColor: '#00BFFF',
  color: 'white',
  padding: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '12px',
};

export default ProductList;
