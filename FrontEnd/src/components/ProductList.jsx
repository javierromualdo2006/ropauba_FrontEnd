import React, { useEffect, useState } from "react";

function ProductList({
  products,
  newProducts,
  updateProductStatus,
  deleteProduct,
  searchTerm,
  user,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Filtrar los productos basados en el searchTerm
  const filteredNewProducts = newProducts.filter((product) =>
    product.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular los índices de los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredNewProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredNewProducts.length / productsPerPage);

  // Manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Manejar el borrado de productos
  const handleDeleteProduct = (index) => {
    const confirmation = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (confirmation) {
      deleteProduct(index);
    }
  };

  useEffect(() => {
    console.log(newProducts);
  }, [newProducts]);

  return (
    <div>
      <div style={productListStyle}>
        {filteredNewProducts.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          currentProducts.map((product, index) => (
            <div key={index} style={productCardStyle}>
              <img
                src={product.Imagen}
                alt={product.Titulo}
                style={imageStyle}
              />
              <div style={infoStyle}>
                <h3 style={titleStyle}>{product.Titulo}</h3>
                <ProductDescription description={product.descripcion} />
                <p style={priceStyle}>Precio: ${product.Precio}</p>
                <p style={stockStyle}>Stock: {product.Stock}</p>
                <p style={statusStyle}>
                  Estado: {product.Stock > 0 ? "Disponible" : "Agotado"}
                </p>
                <div style={buttonContainerStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => updateProductStatus(index)}
                    disabled={product.Stock <= 0}
                  >
                    Comprar
                  </button>
                  {user && (
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDeleteProduct(index)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Contenedor de paginación */}
      <div style={paginationStyle}>
        <button
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
          style={paginationButtonStyle}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              ...pageButtonStyle,
              backgroundColor:
                currentPage === index + 1 ? "#00BFFF" : "#ffffff",
              color: currentPage === index + 1 ? "#ffffff" : "#00BFFF",
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          style={paginationButtonStyle}
          disabled={currentPage === totalPages}
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
      <div
        style={{
          ...descriptionContainerStyle,
          maxHeight: isExpanded ? "50px" : "25px",
        }}
      >
        <p style={descriptionStyle}>{description}</p>
      </div>

      {description.length > 25 && (
        <button onClick={toggleDescription} style={toggleButtonStyle}>
          {isExpanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
}

// Estilos (sin cambios)
const productListStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  padding: "20px",
};

const productCardStyle = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #00BFFF",
  padding: "10px",
  borderRadius: "5px",
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "space-between",
};

const imageStyle = {
  width: "120px",
  height: "120px",
  marginBottom: "10px",
};

const infoStyle = {
  display: "flex",
  flexDirection: "column",
  fontSize: "14px",
  textAlign: "center",
  fontFamily: "Impact, sans-serif",
  color: "#000000",
};

const titleStyle = {
  fontFamily: "Impact, sans-serif",
  color: "#000000",
};

const priceStyle = {
  fontFamily: "Impact, sans-serif",
  color: "#000000",
};

const stockStyle = {
  fontFamily: "Impact, sans-serif",
  color: "#000000",
};

const statusStyle = {
  fontFamily: "Impact, sans-serif",
  color: "#000000",
};

const buttonStyle = {
  backgroundColor: "#00BFFF",
  color: "#ffffff",
  padding: "5px",
  border: "none",
  cursor: "pointer",
  fontSize: "12px",
};

const deleteButtonStyle = {
  backgroundColor: "#ff4d4d",
  color: "#ffffff",
  padding: "5px",
  border: "none",
  cursor: "pointer",
  fontSize: "12px",
  marginLeft: "5px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

const toggleButtonStyle = {
  backgroundColor: "#00BFFF",
  color: "#ffffff",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "14px",
  padding: "5px 10px",
  marginTop: "5px",
};

const descriptionContainerStyle = {
  overflowY: "auto",
  transition: "max-height 0.3s ease",
  maxHeight: "25px",
};

const descriptionStyle = {
  fontSize: "14px",
  margin: "10px 0",
  fontFamily: "Impact, sans-serif",
  color: "#000000",
  whiteSpace: "normal",
  wordWrap: "break-word",
};

const paginationStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const paginationButtonStyle = {
  padding: "10px 20px",
  margin: "0 5px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  backgroundColor: "#00BFFF",
  color: "#ffffff",
};

const pageButtonStyle = {
  padding: "10px",
  margin: "0 5px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  backgroundColor: "#ffffff",
  color: "#00BFFF",
};

export default ProductList;
