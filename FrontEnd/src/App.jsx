import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import WelcomeBox from './components/WelcomeBox';
import Footer from './components/Footer'; 

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'create-post':
        return <CreatePost addProduct={addProduct} goToHomePage={goToHomePage} />;
      case 'login':
        return <Login onLogin={handleLogin} goToHomePage={goToHomePage} />;
      case 'home':
      default:
        return (
          <div style={contentStyle}>
            <WelcomeBox />
            {products.length > 0 ? (
              <ProductList 
                products={products} 
                updateProductStatus={updateProductStatus} 
                changeProductStatus={changeProductStatus} 
              />
            ) : (
              <div style={noProductsStyle}>No hay publicaciones todavía.</div> 
            )}
          </div>
        );
    }
  };

  const goToCreatePost = () => setCurrentPage('create-post');
  const goToHomePage = () => setCurrentPage('home');
  const goToLoginPage = () => setCurrentPage('login');

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    goToHomePage();
  };

  const updateProductStatus = (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = updatedProducts[index];

      if (product.stock > 0) {
        product.stock -= 1;
        product.status = 'pagado';
      }

      if (product.stock === 0) {
        product.status = 'cancelado';
      }

      return updatedProducts;
    });
  };

  const changeProductStatus = (index, newStatus) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].status = newStatus;
      return updatedProducts;
    });
  };

  const handleLogin = (username) => {
    setUser(username);
    goToHomePage();
  };

  const handleLogout = () => {
    setUser(null);
    goToHomePage();
  };

  return (
    <div style={appContainerStyle}>
      <Header 
        goToCreatePost={goToCreatePost} 
        goToHomePage={goToHomePage} 
        goToLoginPage={goToLoginPage} 
        user={user} 
        onLogout={handleLogout} 
      />
      {user && <h2>Bienvenido, {user}!</h2>}
      {renderPage()}
      <Footer /> {/* Asegúrate de que el Footer esté aquí */}
    </div>
  );
}

// Estilo para el mensaje cuando no hay productos
const noProductsStyle = {
  color: 'white',
  textAlign: 'center',
  padding: '20px',
  fontSize: '18px',
};

// Estilo para el contenedor principal
const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',  
  width: '100%',
  overflow: 'hidden', // Evita que los elementos se desborden
};

// Estilo para el contenido de la página (imagen de fondo y productos)
const contentStyle = {
  backgroundImage: 'url(https://resizer.glanacion.com/resizer/v2/el-colegio-de-lugano-que-depende-de-la-LUH2HGFRKVBTRLFKL5JJBMX2VY.jpg?auth=cc3a1a87a939ff1f85202d5283956f1bbe920bdde768a2b588a516cea3831b1d&width=780&height=439&quality=70&smart=true)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed', // Mantiene la imagen fija
  padding: '20px',
  flexGrow: 1, // Permite que el contenido crezca y empuje el footer hacia abajo
  color: '#ffffff',
  margin: 0,
  boxSizing: 'border-box', // Asegura que el padding no cause desbordamiento
  overflowY: 'auto', // Permite el desplazamiento vertical
};

export default App;
