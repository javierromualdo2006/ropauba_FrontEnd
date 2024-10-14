// App.jsx

import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import WelcomeBox from './components/WelcomeBox'; // Asegúrate de importar el WelcomeBox
import Footer from './components/Footer'; // Importar el componente Footer

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Página actual
  const [products, setProducts] = useState([]); // Lista de productos
  const [user, setUser] = useState(null); // Usuario autenticado

  const renderPage = () => {
    switch (currentPage) {
      case 'create-post':
        return <CreatePost addProduct={addProduct} goToHomePage={goToHomePage} />;
      case 'login':
        return <Login onLogin={handleLogin} goToHomePage={goToHomePage} />;
      case 'home':
      default:
        return (
          <div style={backgroundStyle}>
            <WelcomeBox />
            <ProductList 
              products={products} 
              updateProductStatus={updateProductStatus} 
              changeProductStatus={changeProductStatus} 
            />
            <Footer /> {/* Añadir el Footer aquí */}
          </div>
        );
    }
  };

  const goToCreatePost = () => setCurrentPage('create-post');
  const goToHomePage = () => setCurrentPage('home');
  
  const goToLoginPage = () => setCurrentPage('login');

  // Función para añadir un nuevo producto
  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    goToHomePage();
  };

  // Función para actualizar el estado del producto y disminuir el stock
  const updateProductStatus = (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = updatedProducts[index];

      if (product.stock > 0) {
        product.stock -= 1; // Reducir el stock en 1
        product.status = 'pagado'; // Cambiar el estado a 'pagado'
      }

      // Si el stock llega a 0, cambiar el estado a 'cancelado'
      if (product.stock === 0) {
        product.status = 'cancelado';
      }

      return updatedProducts;
    });
  };

  // Función para cambiar el estado del producto manualmente
  const changeProductStatus = (index, newStatus) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].status = newStatus;
      return updatedProducts;
    });
  };

  // Función para iniciar sesión
  const handleLogin = (username) => {
    setUser(username);
    goToHomePage(); // Redirigir a la página de inicio
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setUser(null); // Eliminar el usuario autenticado
    goToHomePage(); // Redirigir a la página de inicio
  };

  return (
    <div style={appContainerStyle}> {/* Añadir estilo para el contenedor principal */}
      <Header 
        goToCreatePost={goToCreatePost} 
        goToHomePage={goToHomePage} 
        goToLoginPage={goToLoginPage} // Añadir función para ir a login
        user={user} // Pasamos el usuario autenticado
        onLogout={handleLogout} // Pasar función de logout
      />
      {user && <h2>Bienvenido, {user}!</h2>} {/* Mensaje de bienvenida */}
      {renderPage()}
    </div>
  );
}

// Estilo para el fondo del contenedor
const backgroundStyle = {
  backgroundImage: 'url(https://resizer.glanacion.com/resizer/v2/el-colegio-de-lugano-que-depende-de-la-LUH2HGFRKVBTRLFKL5JJBMX2VY.jpg?auth=cc3a1a87a939ff1f85202d5283956f1bbe920bdde768a2b588a516cea3831b1d&width=780&height=439&quality=70&smart=true)', // Imagen de fondo
  backgroundSize: 'cover', // Asegura que la imagen cubra todo el fondo
  backgroundPosition: 'center', // Centra la imagen de fondo
  padding: '20px', // Espacio alrededor del contenido
  minHeight: 'calc(100vh - 60px)', // Asegura que el contenedor tenga al menos la altura de la ventana menos el footer
  color: '#ffffff', // Color del texto por defecto
};

// Estilo para el contenedor principal
const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column', // Colocar todos los elementos en columna
  minHeight: '100vh', // Asegura que el contenedor tenga al menos la altura de la ventana
};

export default App;
