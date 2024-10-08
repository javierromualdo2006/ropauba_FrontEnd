import React, { useState } from 'react';

function CreatePost({ addProduct, goToHomePage }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verifica si el precio es nulo o vacío
    if (price.trim() === '' || isNaN(price) || parseFloat(price) <= 0) {
      alert('Por favor, ingrese un precio válido mayor que 0.');
      return;
    }

    const newProduct = { 
      title, 
      description, 
      price: parseFloat(price), // Asegurarse de que el precio es un número
      image, 
      stock: 10, // Stock inicial
      status: 'pendiente' // Estado inicial
    };
    addProduct(newProduct);
  };

  return (
    <div style={formContainer}>
      <h2>Crear Nueva Publicación</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input 
          type="text" 
          placeholder="Título" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required
          maxLength={30} // Limitar a 30 caracteres
        />
        <textarea 
          placeholder="Descripción" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required
          maxLength={150} // Limitar a 150 caracteres
        />
        <input 
          type="text" 
          placeholder="Precio" 
          value={price} 
          onChange={(e) => {
            // Asegurarse de que solo se ingresen números
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value) && value.length <= 7) { // Limitar a 7 caracteres (9999999)
              setPrice(value);
            }
          }} 
          required
          minLength={1} // Límite mínimo de 1 carácter
          maxLength={7} // Límite máximo de 7 caracteres
        />
        <input 
          type="text" 
          placeholder="URL de Imagen" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
          required
        />
        <button type="submit" style={buttonStyle}>Publicar</button>
      </form>
      <button onClick={goToHomePage} style={cancelButtonStyle}>Cancelar</button>
    </div>
  );
}

const formContainer = {
  padding: '20px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const buttonStyle = {
  backgroundColor: '#00BFFF',
  color: 'white',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
};

const cancelButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '10px',
};

export default CreatePost;
