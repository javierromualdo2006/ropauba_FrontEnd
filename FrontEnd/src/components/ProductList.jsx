import React, { useState } from 'react';

function ProductList({ products, updateProductStatus, changeProductStatus }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Número de productos por página

  // Calcular los índices de los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div style={productListStyle}>
        {currentProducts.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          currentProducts.map((product, index) => (
            <div key={index} style={productCardStyle}>
              <img src={product.image} alt={product.title} style={imageStyle} />
              <div style={infoStyle}>
                <h3 style={titleStyle}>{product.title}</h3>
                {/* Mostrar descripción truncada y botón "Ver más" si es necesario */}
                <ProductDescription description={product.description} />
                <p style={priceStyle}>Precio: ${product.price}</p>
                <p style={stockStyle}>Stock: {product.stock}</p>
                <p style={statusStyle}>Estado: 
                  <select value={product.status} onChange={(e) => changeProductStatus(index, e.target.value)}>
                    <option value="Agotado">Agotado</option>
                    <option value="Disponible">Disponible</option>
                    <option value="Cancelado">Cancelado</option>
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

      {/* Contenedor de paginación */}
      <div style={paginationStyle}>
        <button
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
          style={paginationButtonStyle}
          disabled={currentPage === 1} // Deshabilitar si estamos en la primera página
        >
          Anterior
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              ...pageButtonStyle,
              backgroundColor: currentPage === index + 1 ? '#00BFFF' : '#ffffff', // Resaltar la página actual
              color: currentPage === index + 1 ? '#ffffff' : '#00BFFF',
            }}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
          style={paginationButtonStyle}
          disabled={currentPage === totalPages} // Deshabilitar si estamos en la última página
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

function ProductDescription({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {/* Limitar la altura con scroll cuando se expande */}
      <div 
        style={{
          ...descriptionContainerStyle,
          maxHeight: isExpanded ? '50px' : '25px'  // Altura limitada cuando está expandido
        }}
      >
        <p style={descriptionStyle}>
          {description}
        </p>
      </div>

      {/* Botón para alternar la descripción */}
      {description.length > 25 && (
        <button onClick={toggleDescription} style={toggleButtonStyle}>
          {isExpanded ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </div>
  );
}

// Estilos
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
  fontFamily: 'Impact, sans-serif', // Asegúrate de usar Impact
  color: '#000000', // Color negro para el texto
};

const titleStyle = {
  fontFamily: 'Impact, sans-serif', // Tipografía Impact para el título
  color: '#000000', // Color negro
};

const priceStyle = {
  fontFamily: 'Impact, sans-serif', // Tipografía Impact para el precio
  color: '#000000', // Color negro
};

const stockStyle = {
  fontFamily: 'Impact, sans-serif', // Tipografía Impact para el stock
  color: '#000000', // Color negro
};

const statusStyle = {
  fontFamily: 'Impact, sans-serif', // Tipografía Impact para el estado
  color: '#000000', // Color negro
};

const buttonStyle = {
  backgroundColor: '#00BFFF',
  color: '#ffffff',
  padding: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '12px',
};

const toggleButtonStyle = {
  backgroundColor: '#00BFFF', // Color celeste
  color: '#ffffff',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '14px',
  padding: '5px 10px',
  marginTop: '5px', // Espaciado entre la descripción y el botón
};

const descriptionContainerStyle = {
  overflowY: 'auto', // Habilitar scroll vertical si la descripción es larga
  transition: 'max-height 0.3s ease', // Transición suave al expandir o colapsar
  maxHeight: '25px', // Altura inicial cuando está colapsada
};

const descriptionStyle = {
  fontSize: '14px',
  margin: '10px 0',
  fontFamily: 'Impact, sans-serif', // Asegúrate de usar Impact
  color: '#000000', // Color negro
  whiteSpace: 'normal', // Asegura que el texto se ajuste correctamente
  wordWrap: 'break-word', // Evita que palabras largas se desborden
};

// Estilo para el contenedor de paginación
const paginationStyle = {
  display: 'flex',
  justifyContent: 'center', // Centrar los botones de paginación
  marginTop: '20px', // Espaciado superior
};

const paginationButtonStyle = {
  padding: '10px 20px',
  margin: '0 5px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  backgroundColor: '#00BFFF', // Fondo celeste para botones de paginación
  color: '#ffffff', // Texto blanco para botones de paginación
};

const pageButtonStyle = {
  padding: '10px',
  margin: '0 5px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  backgroundColor: '#ffffff', // Fondo blanco por defecto
  color: '#00BFFF', // Color celeste por defecto
};

export default ProductList;
