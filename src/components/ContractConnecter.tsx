import { ethers } from "ethers";
import { ContractAbi } from "../abi/CidCounterAbi";
import { useState } from "react";
import { CONTRACT_ADDRESS_MANTLE, CONTRACT_ADDRESS_ZKSYNC } from "../globals";
import { Chain } from "../interface";

interface ContractConecterProps {
  signer: ethers.Signer | null;
  cid: string | null;
  chain: Chain;
}

const ContractConnecter: React.FC<ContractConecterProps> = ({
  signer,
  cid,
  chain,
}) => {
  const contractAddress =
    chain == Chain.MANTLE ? CONTRACT_ADDRESS_MANTLE : CONTRACT_ADDRESS_ZKSYNC;
  const contract = new ethers.Contract(contractAddress, ContractAbi, signer);
  const [count, setCount] = useState(null);
  const [added, setAdded] = useState(false);
  const [voted, setVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addCid = async (cid: string) => {
    try {
      setIsLoading(true);
      const tx = await contract.addCid(cid);
      await tx.wait();
      console.log("CID added successfully");
      setAdded(true);
    } catch (err: any) {
      console.error("Add CID failed:", err);
      if (err.message.includes("CID already exists")) {
        alert("💁‍♀️ Sticker already exists ");
        setAdded(true);
      }
    }
    setIsLoading(false);
  };

  const incrementCid = async (cid: string) => {
    try {
      setIsLoading(true);
      setVoted(false);
      const tx = await contract.incrementCid(cid);
      await tx.wait();
      console.log("CID counter incremented");
      setVoted(true);
    } catch (err: any) {
      console.error("Increment failed:", err);
      if (err.message.includes("CID does not exist")) {
        alert("💁‍♀️ You need to add your sticker in the Smart Contract");
      }
    }
    setIsLoading(false);
  };

  const getCidCount = async (cid: string) => {
    try {
      const count = await contract.getCidCount(cid);
      console.log(`CID count: ${count.toString()}`);
      setCount(count);
    } catch (err) {
      console.error("Get count failed:", err);
      return null;
    }
  };

  const handleAddCid = () => {
    if (!cid) return;
    addCid(cid);
  };

  const handleGetCidCound = () => {
    if (!cid) return;

    getCidCount(cid);
  };

  const handleIncrementCid = () => {
    if (!cid) return;
    incrementCid(cid);
  };

  return (
    <div className="flex-col">
      <button
        onClick={() => handleAddCid()}
        className="bg-blue-500 text-white px-4 py-2 rounded m-4 "
      >
        Add the sticker pack to the smart contract
      </button>

      {isLoading && <p>⏳ Loading... </p>}
      {voted && <p>🙌 Voted</p>}
      {count && <p>👀 Number of votes: {count}</p>}

      {added && (
        <div className="flex-row">
          <button
            onClick={() => handleIncrementCid()}
            className="bg-green-600 text-white px-4 py-2 rounded m-4"
          >
            Vote for this sticker pack
          </button>

          <button
            onClick={() => handleGetCidCound()}
            className="bg-orange-400 text-white px-4 py-2 rounded m-4"
          >
            Get number of votes
          </button>
        </div>
      )}
    </div>
  );
};

export default ContractConnecter;
