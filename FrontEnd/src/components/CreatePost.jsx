import React, { useState } from 'react';

function CreatePost({ addProduct, goToHomePage }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { 
      title, 
      description, 
      price, 
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
        />
        <textarea 
          placeholder="Descripción" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required
        />
        <input 
          type="number" 
          placeholder="Precio" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required
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
