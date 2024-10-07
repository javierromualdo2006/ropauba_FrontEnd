import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';

function App() {
  const [currentView, setCurrentView] = useState('products');

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <div>
      <Header onNavigate={handleNavigation} />
      {currentView === 'products' && <ProductList />}
      {currentView === 'home' && <h1>Página Principal</h1>}
    </div>
  );
}

export default App;
