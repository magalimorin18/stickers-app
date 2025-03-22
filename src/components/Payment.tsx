import { CSSProperties } from "react";

import { DaimoPayButton } from "@daimo/pay";
import { baseUSDC  } from "@daimo/contract";
import { getAddress } from 'viem';

import { DaimoPayProvider, getDefaultConfig } from "@daimo/pay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { createConfig, WagmiProvider } from "wagmi";
import { DAIMOPAY_API_URL } from "../shared";

export const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: "Daimo Pay Basic Demo",
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  }),
);

const queryClient = new QueryClient();

function Payment() {
  const creatorName = "Pepe Diaz";
  const stickerPacksCount = 12;
  const successfulDownloads = 100;
  const walletAddress = "0xe1448A266849538da23Df9061dDa57C20aF1009e"; // Ejemplo de dirección

  const handleReceivePayment = () => {
    // Aquí va la lógica para procesar el pago
    console.log("Procesando pago...");
    alert("Pago recibido!"); // Reemplazar con una lógica de pago real
  };

  return (
    <div style={paymentContainerStyle}>
      <h2 style={headerStyle}>Payment Details</h2>

      <p style={creatorInfoStyle}>Creator Name: {creatorName}</p>

      <p style={stickerPacksStyle}>
        Sticker Packs: {stickerPacksCount}
        {/* Puedes añadir aquí miniaturas de stickers si tienes */}
      </p>

      <p style={successfulDownloadsStyle}>
        {successfulDownloads} Downloads Successfully
      </p>

      <p style={walletAddressStyle}>
        Your Wallet: {walletAddress.substring(0, 10)}...
        {walletAddress.substring(walletAddress.length - 10)}
      </p>

      
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <DaimoPayProvider payApiUrl={DAIMOPAY_API_URL} debugMode>
          <DaimoPayButton
            appId="daimopay-demo"
            toChain={baseUSDC.chainId}
            toAddress={getAddress("0xe1448A266849538da23Df9061dDa57C20aF1009e")}
            toToken={getAddress(baseUSDC.token)}
            intent="Deposit"
            />
          </DaimoPayProvider>
        </QueryClientProvider>
      </WagmiProvider>
      
    </div>
  );
}

// Estilos
const paymentContainerStyle: CSSProperties = {
  padding: "20px",
  marginTop: "60px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const headerStyle: CSSProperties = {
  fontSize: "2em",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "20px",
};

const creatorInfoStyle: CSSProperties = {
  fontSize: "1.2em",
  marginBottom: "10px",
};

const stickerPacksStyle: CSSProperties = {
  fontSize: "1em",
  marginBottom: "10px",
};

const successfulDownloadsStyle: CSSProperties = {
  fontSize: "1em",
  marginBottom: "10px",
  color: "green",
};

const walletAddressStyle: CSSProperties = {
  fontSize: "0.9em",
  fontFamily: "monospace",
  marginBottom: "20px",
};

const paymentButtonStyle: CSSProperties = {
  backgroundColor: "#25D366", // Verde WhatsApp
  color: "white",
  fontSize: "1.2em",
  padding: "15px 30px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

export default Payment;
