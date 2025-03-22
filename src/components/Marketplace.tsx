import React from 'react';

// Interfaz para definir la estructura de un sticker
interface Sticker {
  id: string;
  imageUrl: string;
  creatorName: string;
}

function Marketplace() {
  // Datos de ejemplo de stickers (reemplaza esto con tus datos reales)
  const stickers: Sticker[] = [
    {
      id: '1',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/001/081/351/products/messi1-a8e82ece5587b8a8b916856486000277-640-0.png', // Reemplaza con la URL real del sticker
      creatorName: 'Usuario123',
    },
    {
      id: '2',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/001/081/351/products/messi1-a8e82ece5587b8a8b916856486000277-640-0.png', // Reemplaza con la URL real del sticker
      creatorName: 'StickerMaster',
    },
    {
      id: '3',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/001/081/351/products/messi1-a8e82ece5587b8a8b916856486000277-640-0.png', // Reemplaza con la URL real del sticker
      creatorName: 'ArtLover',
    },
    {
      id: '4',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/001/081/351/products/messi1-a8e82ece5587b8a8b916856486000277-640-0.png', // Reemplaza con la URL real del sticker
      creatorName: 'Usuario123',
    },
    {
      id: '5',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/001/081/351/products/messi1-a8e82ece5587b8a8b916856486000277-640-0.png', // Reemplaza con la URL real del sticker
      creatorName: 'StickerMaster',
    },
    {
      id: '6',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/001/081/351/products/messi1-a8e82ece5587b8a8b916856486000277-640-0.png', // Reemplaza con la URL real del sticker
      creatorName: 'ArtLover',
    },
    {
      id: '7',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/001/081/351/products/messi1-a8e82ece5587b8a8b916856486000277-640-0.png', // Reemplaza con la URL real del sticker
      creatorName: 'Usuario123',
    },
    {
      id: '8',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/001/081/351/products/messi1-a8e82ece5587b8a8b916856486000277-640-0.png', // Reemplaza con la URL real del sticker
      creatorName: 'StickerMaster',
    },
    {
      id: '9',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/001/081/351/products/messi1-a8e82ece5587b8a8b916856486000277-640-0.png', // Reemplaza con la URL real del sticker
      creatorName: 'ArtLover',
    },
  ];

  const handleDownload = (stickerId: string) => {
    // Aquí implementarías la lógica de descarga del sticker con el ID especificado
    console.log(`Descargando sticker con ID: ${stickerId}`);
    // Puedes usar una librería como `file-saver` para facilitar la descarga
    // o generar un enlace <a> con el atributo `download`
  };

  const handleShare = (stickerId: string) => {
    // Aquí implementarías la lógica de compartir el sticker con el ID especificado
    console.log(`Compartiendo sticker con ID: ${stickerId}`);
    // Puedes usar la Web Share API o generar un enlace para compartir en redes sociales
  };

  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
      <h2>Marketplace de Stickers</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {stickers.map((sticker) => (
          <div key={sticker.id} style={{
            width: '200px',
            margin: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: 'white',
          }}>
            <img src={sticker.imageUrl} alt="Sticker" style={{ maxWidth: '100%', height: 'auto' }} />
            <p>Creador: {sticker.creatorName}</p>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button onClick={() => handleDownload(sticker.id)}>Descargar</button>
              <button onClick={() => handleShare(sticker.id)}>Compartir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;