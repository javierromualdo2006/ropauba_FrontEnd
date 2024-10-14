import React, { useState } from 'react';

function CreatePost({ addProduct, goToHomePage }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  // Función para dividir la descripción cada 35 caracteres
  const formatDescription = (text) => {
    const formattedText = text.match(/.{1,35}/g)?.join('\n') || text;
    return formattedText;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica si el precio es nulo o vacío
    if (price.trim() === '' || isNaN(price) || parseFloat(price) <= 0) {
      alert('Por favor, ingrese un precio válido mayor que 0.');
      return;
    }

    const newProduct = { 
      title, 
      description: formatDescription(description), // Aplicar formato a la descripción
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
          onChange={(e) => setDescription(formatDescription(e.target.value))} // Aplicar formato en tiempo real
          required
          maxLength={200} // Limitar a 200 caracteres
          style={{ whiteSpace: 'pre-wrap' }} // Mostrar los saltos de línea
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

// Cambiar el estilo del contenedor del formulario para incluir la imagen de fondo
const formContainer = {
  padding: '20px',
  height: '100vh', // Asegúrate de que el contenedor ocupe toda la altura de la ventana
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url('https://resizer.glanacion.com/resizer/v2/el-colegio-de-lugano-que-depende-de-la-LUH2HGFRKVBTRLFKL5JJBMX2VY.jpg?auth=cc3a1a87a939ff1f85202d5283956f1bbe920bdde768a2b588a516cea3831b1d&width=780&height=439&quality=70&smart=true')`,
  backgroundSize: 'cover', // Asegúrate de que la imagen cubra todo el fondo
  backgroundPosition: 'center', // Centra la imagen
  backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco semi-transparente para el formulario
  padding: '20px', // Espaciado interno del formulario
  borderRadius: '10px', // Bordes redondeados
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
