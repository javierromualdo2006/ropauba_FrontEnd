import React, { useState, useEffect } from 'react';

function CreatePost({ addProduct, goToHomePage, postId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);

  // Función para dividir la descripción cada 35 caracteres
  const formatDescription = (text) => {
    const formattedText = text.match(/.{1,35}/g)?.join('\n') || text;
    return formattedText;
  };

  useEffect(() => {
    // Si ya existe un postId, cargar los datos de la publicación
    if (postId) {
      // Realiza una solicitud para obtener los datos de la publicación
      fetch(`http://127.0.0.1:5000/publicaciones/${postId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setTitle(data.titulo);
            setDescription(data.descripcion);
            setPrice(data.precio);
            setImage(data.imagen);
          }
        })
        .catch((err) => console.error('Error al cargar la publicación:', err));
    }
  }, [postId]);

  const handleSubmit = async (e) => {
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

    try {
      // Realizar el POST a la API
      const response = await fetch('http://127.0.0.1:5000/publicaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: title,
          descripcion: description,
          id_producto: 1,  // Asegúrate de enviar el id_producto correcto
          id_usuario: 1,   // Asegúrate de enviar el id_usuario correcto
          imagen: image
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si la creación es exitosa, redirigir a la página principal
        goToHomePage(); // Redirige a la página principal
      } else {
        // Si hubo un error, mostramos el error
        setError(data.error || 'Error inesperado');
      }
    } catch (err) {
      console.error('Error al crear la publicación:', err);
      setError('Hubo un problema al crear la publicación');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/publicaciones/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'user_id': '1',  // Aquí deberías pasar el ID del usuario logueado
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Si la eliminación es exitosa, redirigir a la página principal
        goToHomePage(); // Redirige a la página principal
      } else {
        // Si hubo un error, mostramos el error
        setError(data.error || 'Error inesperado');
      }
    } catch (err) {
      console.error('Error al eliminar la publicación:', err);
      setError('Hubo un problema al eliminar la publicación');
    }
  };

  return (
    <div style={formContainer}>
      <h2>{postId ? 'Editar Publicación' : 'Crear Nueva Publicación'}</h2>
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
        {postId && <button type="button" onClick={handleDelete} style={deleteButtonStyle}>Eliminar Publicación</button>}
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={goToHomePage} style={cancelButtonStyle}>Cancelar</button>
    </div>
  );
}

const formContainer = {
  padding: '20px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'url(https://resizer.glanacion.com/resizer/v2/el-colegio-de-lugano-que-depende-de-la-LUH2HGFRKVBTRLFKL5JJBMX2VY.jpg?auth=cc3a1a87a939ff1f85202d5283956f1bbe920bdde768a2b588a516cea3831b1d&width=780&height=439&quality=70&smart=true)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '20px',
  borderRadius: '10px',
};

const buttonStyle = {
  backgroundColor: '#00BFFF',
  color: 'white',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
};

const cancelButtonStyle = {
  backgroundColor: 'gray',
  color: 'white',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '10px',
};

export default CreatePost;
