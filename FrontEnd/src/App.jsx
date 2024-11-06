import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import WelcomeBox from "./components/WelcomeBox";
import Footer from "./components/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/vista_publicaciones")
      .then((response) => response.json())
      .then((data) => setNewProducts(data))
      .catch((error) =>
        console.error("Error fetching publication IDs:", error)
      );
  }, []);

  // Función para renderizar las páginas
  const renderPage = () => {
    switch (currentPage) {
      case "create-post":
        return (
          <CreatePost addProduct={addProduct} goToHomePage={goToHomePage} />
        );
      case "login":
        return <Login onLogin={handleLogin} goToHomePage={goToHomePage} />;
      case "home":
      default:
        return (
          <div style={contentStyle}>
            <WelcomeBox />
            {newProducts ? (
              <ProductList
                products={products}
                newProducts={newProducts} //props
                updateProductStatus={updateProductStatus}
                deleteProduct={deleteProduct}
                searchTerm={searchTerm}
                user={user} // Pasar el usuario al componente
              />
            ) : (
              <div style={noProductsStyle}>No hay productos.</div>
            )}
          </div>
        );
    }
  };

  // Funciones de navegación
  const goToHomePage = () => setCurrentPage("home");
  const goToCreatePost = () => setCurrentPage("create-post");
  const goToLoginPage = () => setCurrentPage("login");

  // Función para agregar productos
  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    goToHomePage();
  };

  // Función para actualizar el estado del producto
  const updateProductStatus = (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = updatedProducts[index];

      if (product.stock > 0) {
        product.stock -= 1;
        product.status = "pagado";
      }

      if (product.stock === 0) {
        product.status = "cancelado";
      }

      return updatedProducts;
    });
  };

  // Función para eliminar productos
  const deleteProduct = (index) => {
    if (index >= 0 && index < products.length) {
      setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
    }
  };

  // Funciones de login y logout
  const handleLogin = (username) => {
    setUser(username);
    goToHomePage();
  };

  const handleLogout = () => {
    setUser(null);
    goToHomePage();
  };

  // Función de búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div style={appContainerStyle}>
      <Header
        goToCreatePost={goToCreatePost}
        goToHomePage={goToHomePage}
        goToLoginPage={goToLoginPage}
        user={user}
        onLogout={handleLogout}
        onSearch={handleSearch}
      />
      {renderPage()}
      <Footer />
    </div>
  );
}

// Estilos
const noProductsStyle = {
  color: "white",
  textAlign: "center",
  padding: "20px",
  fontSize: "18px",
};

const appContainerStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflow: "hidden",
};

const contentStyle = {
  backgroundImage:
    "url(https://resizer.glanacion.com/resizer/v2/el-colegio-de-lugano-que-depende-de-la-LUH2HGFRKVBTRLFKL5JJBMX2VY.jpg?auth=cc3a1a87a939ff1f85202d5283956f1bbe920bdde768a2b588a516cea3831b1d&width=780&height=439&quality=70&smart=true)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  padding: "20px",
  flexGrow: 1,
  color: "#ffffff",
  margin: 0,
  boxSizing: "border-box",
  overflowY: "auto",
};

export default App;
