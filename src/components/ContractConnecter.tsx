import { ethers } from "ethers";
import { ContractAbi } from "../abi/CidCounterAbi";

interface ContractConecterProps {
  signer: ethers.Signer | null;
  cid: string | null;
}

const ContractConnecter: React.FC<ContractConecterProps> = ({
  signer,
  cid,
}) => {
  const contractAddress = "0x6914403E7873ABAa193Deb1Bdd712C47c1A7bA04";
  const contract = new ethers.Contract(contractAddress, ContractAbi, signer);

  const addCid = async (cid: string) => {
    try {
      const tx = await contract.addCid(cid);
      await tx.wait();
      console.log("CID added successfully");
    } catch (err) {
      console.error("Add CID failed:", err);
    }
  };

  const incrementCid = async (cid: string) => {
    try {
      const tx = await contract.incrementCid(cid);
      await tx.wait();
      console.log("CID counter incremented");
    } catch (err) {
      console.error("Increment failed:", err);
    }
  };

  const getCidCount = async (cid: string) => {
    try {
      const count = await contract.getCidCount(cid);
      console.log(`CID count: ${count.toString()}`);
    } catch (err) {
      console.error("Get count failed:", err);
      return null;
    }
  };

  const handleAddCid = () => {
    console.log("😃Add CID");
    if (!cid) return;
    addCid(cid);
  };

  const handleGetCidCound = () => {
    console.log("😄Getting CID count");
    if (!cid) return;

    getCidCount(cid);
  };

  const handleIncrementCid = () => {
    console.log("😄Incrementing CID");
    if (!cid) return;

    incrementCid(cid);
  };

  return (
    <div>
      <p>I am a contract interacting with CID {cid}</p>
      <button
        onClick={() => handleAddCid()}
        className="bg-blue-600 text-white px-4 py-2 rounded m-4 "
      >
        Add the sticker pack to the smart contract
      </button>

      <button
        onClick={() => handleGetCidCound()}
        className="bg-blue-600 text-white px-4 py-2 rounded m-4"
      >
        Get number of votes
      </button>

      <button
        onClick={() => handleIncrementCid()}
        className="bg-blue-600 text-white px-4 py-2 rounded m-4"
      >
        Vote for this sticker pack
      </button>
    </div>
  );
};

export default ContractConnecter;
