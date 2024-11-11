import React, { useEffect, useState } from "react";

// Asegúrate de pasarle la función deleteProduct desde el componente padre
function ProductList({
  newProducts,
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
  const handleDeleteProduct = (id) => {
    const confirmation = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (confirmation) {
      deleteProduct(id);
    }
  };

  return (
    <div>
      <div style={productListStyle}>
        {filteredNewProducts.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          currentProducts.map((product, index) => (
            <div key={product.id || index} style={productCardStyle}>
              <img src={product.Imagen} alt={product.Titulo} style={imageStyle} />
              <div style={infoStyle}>
                <h3 style={titleStyle}>{product.Titulo}</h3>
                <ProductDescription description={product.descripcion} />
                <p style={priceStyle}>Precio: ${product.Precio}</p>
                <p style={stockStyle}>Stock: {product.Stock}</p>
                <p style={statusStyle}>
                  Estado: {product.Stock > 0 ? "Disponible" : "Agotado"}
                </p>
                <div style={buttonContainerStyle}>
                  <button style={buttonStyle} disabled={product.Stock <= 0}>
                    Comprar
                  </button>
                  {user && (
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDeleteProduct(product.id)}
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

function deleteProduct(id) {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    alert("Se requiere autenticación.");
    return;
  }

  fetch(`http://localhost:5000/publicaciones/${id}`, {
    method: "DELETE",
    headers: {
      "User-Id": userId,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo eliminar la publicación");
      }
      return response.json();
    })
    .then((data) => {
      alert(data.mensaje); // Mostrar mensaje de éxito o error

      // Aquí actualizamos el estado para eliminar el producto de la lista en el frontend
      setNewProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    })
    .catch((error) => {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un error al eliminar el producto");
    });
}



export default ProductList;

