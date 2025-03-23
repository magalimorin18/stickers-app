import { useState } from "react";
import { ethers } from "ethers";
import ImageUploader from "./ImageUploader";
import UploadToIPFSButton from "./UploadToIPFSButton";
import ContractConnecter from "./ContractConnecter";
import { ChainParameters } from "../interface";
import { mantleTestnetParams, zkSyncTestnetParams } from "../constants";

function StickerUploader() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [chainParameters, setChainParameters] =
    useState<ChainParameters>(zkSyncTestnetParams);

  const switchToChain = async (chainParameters: ChainParameters) => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainParameters.chainId }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [chainParameters],
          });
        } catch (addError) {
          console.error("Failed to add zkSync chain:", addError);
        }
      } else {
        console.error("Failed to switch chain:", switchError);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      await switchToChain(chainParameters);

      try {
        console.log("Connecting Wallet@@😇");
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setSigner(signer);
        setWalletAddress(address);
        setIsConnected(true);
      } catch (error) {
        console.error("User rejected wallet connection:", error);
      }
    } else {
      alert("Please install MetaMask browser extension!");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 text-black mt-10">
        Choose chain & Connect wallet
      </h1>
      <div className="flex-row">
        <button
          onClick={() => {
            setChainParameters(zkSyncTestnetParams);
          }}
          className="bg-pink-400 text-white px-4 py-2 rounded gap:10"
        >
          ZKSYNC
        </button>

        <button
          onClick={() => {
            setChainParameters(mantleTestnetParams);
          }}
          className="bg-pink-400 text-white px-4 py-2 rounded"
        >
          MANTLE
        </button>
      </div>

      {isConnected ? (
        <div>
          <p className="text-lg mb-2">Connected Wallet:</p>
          <p className="font-mono text-sm bg-gray-100 p-2 rounded">
            {walletAddress}
          </p>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Connect MetaMask on {chainParameters.chainName} network
        </button>
      )}

      <h1 className="text-3xl font-bold mb-4 text-black mt-10 ">
        Upload your sticker
      </h1>
      <ImageUploader
        fixedWidth={300}
        fixedHeight={300}
        onImageUpload={(file) => {
          setImageFile(file);
          console.log("Uploaded image:", file);
        }}
      />
      <UploadToIPFSButton
        imageFile={imageFile}
        onUploadComplete={(cid) => setCid(cid)}
      />
      {cid && (
        <p className="mt-4">
          Uploaded CID: <code>{cid}</code>
        </p>
      )}
      {cid && (
        <ContractConnecter
          signer={signer}
          cid={cid}
          chain={chainParameters.chainName}
        />
      )}
    </div>
  );
}
export default StickerUploader;
