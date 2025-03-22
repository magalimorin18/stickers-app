import React from 'react';
import { CSSProperties } from 'react';

function Payment() {
  const creatorName = "StickerProCreator";
  const stickerPacksCount = 12;
  const successfulDownloads = 100;
  const walletAddress = "0x0000000000000000000000000000000000000000"; // Ejemplo de dirección

  const handleReceivePayment = () => {
    // Aquí va la lógica para procesar el pago
    console.log("Procesando pago...");
    alert("Pago recibido!"); // Reemplazar con una lógica de pago real
  };

  return (
    <div style={paymentContainerStyle}>
      <h2 style={headerStyle}>Payment Details</h2>

      <p style={creatorInfoStyle}>
        Creator Name: {creatorName}
      </p>

      <p style={stickerPacksStyle}>
        Sticker Packs: {stickerPacksCount}
        {/* Puedes añadir aquí miniaturas de stickers si tienes */}
      </p>

      <p style={successfulDownloadsStyle}>
        {successfulDownloads} Downloads Successfully
      </p>

      <p style={walletAddressStyle}>
        Your Wallet: {walletAddress.substring(0, 10)}...{walletAddress.substring(walletAddress.length - 10)}
      </p>

      <button style={paymentButtonStyle} onClick={handleReceivePayment}>
        Receive Payment
      </button>
    </div>
  );
}

// Estilos
const paymentContainerStyle: CSSProperties = {
  padding: '20px',
  marginTop: '60px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headerStyle: CSSProperties = {
  fontSize: '2em',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '20px',
};

const creatorInfoStyle: CSSProperties = {
  fontSize: '1.2em',
  marginBottom: '10px',
};

const stickerPacksStyle: CSSProperties = {
  fontSize: '1em',
  marginBottom: '10px',
};

const successfulDownloadsStyle: CSSProperties = {
  fontSize: '1em',
  marginBottom: '10px',
  color: 'green',
};

const walletAddressStyle: CSSProperties = {
  fontSize: '0.9em',
  fontFamily: 'monospace',
  marginBottom: '20px',
};

const paymentButtonStyle: CSSProperties = {
  backgroundColor: '#25D366', // Verde WhatsApp
  color: 'white',
  fontSize: '1.2em',
  padding: '15px 30px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

export default Payment;