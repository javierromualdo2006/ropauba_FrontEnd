import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import WelcomeBox from "./components/WelcomeBox";
import Footer from "./components/Footer";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/vista_publicaciones");
        const data = await response.json();
        setNewProducts(data);
      } catch (error) {
        console.error("Error fetching publication IDs:", error);
      }
    };
    fetchProducts();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "create-post":
        return (
          <CreatePost
            addProduct={addProduct}
            goToHomePage={goToHomePage}
          />
        );
      case "login":
        return (
          <Login
            onLogin={handleLogin}
            goToHomePage={goToHomePage}
          />
        );
      case "home":
      default:
        return (
          <div style={contentStyle}>
            <WelcomeBox />
            {newProducts.length > 0 ? (
              <ProductList
                products={products}
                newProducts={newProducts}
                updateProductStatus={updateProductStatus}
                deleteProduct={deleteProduct}
                searchTerm={searchTerm}
                user={user}
              />
            ) : (
              <div style={noProductsStyle}>No hay productos.</div>
            )}
          </div>
        );
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    handleNavigation("home");
  };

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

  const deleteProduct = (index) => {
    if (index >= 0 && index < products.length) {
      setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
    }
  };

  const handleLogin = (username) => {
    setUser(username);
    handleNavigation("home");
  };

  const handleLogout = () => {
    setUser(null);
    handleNavigation("home");
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const goToHomePage = () => {
    handleNavigation("home");
  };

  const goToCreatePost = () => {
    handleNavigation("create-post");
  };

  const goToLoginPage = () => {
    handleNavigation("login");
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
};

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