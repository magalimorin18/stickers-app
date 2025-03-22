// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StickerPackManager {

    struct StickerPack {
        string cid; // IPFS CID of the sticker pack
        uint256 downloadCount; // Number of downloads
        address creator; // Creator's wallet address
        uint256 creatorEarnings; // Creator's accumulated earnings (in cents of a dollar)
        bool exists; // Indicates whether the sticker pack exists
    }

    mapping(uint256 => StickerPack) public stickerPacks; // Maps a unique ID to a sticker pack
    uint256 public nextStickerPackId = 1; // Auto-incrementing ID for sticker packs

    address payable public owner; // Wallet address of the contract owner (for withdrawing funds)
    uint256 public pricePerDownload = 10; // Price per download in cents of a dollar (0.1 USD)

    event StickerPackCreated(uint256 stickerPackId, string cid, address creator);
    event StickerPackDownloaded(uint256 stickerPackId, address downloader);
    event CreatorPaid(uint256 stickerPackId, address creator, uint256 amountPaid);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier stickerPackExists(uint256 _stickerPackId) {
        require(stickerPacks[_stickerPackId].exists, "Sticker pack does not exist.");
        _;
    }


    /**
     * @dev Creates a new sticker pack. Can only be called by the sticker pack creator.
     * @param _cid The IPFS CID of the sticker pack.
     */
    function createStickerPack(string memory _cid) public {
        require(bytes(_cid).length > 0, "CID cannot be empty.");

        stickerPacks[nextStickerPackId] = StickerPack({
            cid: _cid,
            downloadCount: 0,
            creator: msg.sender,
            creatorEarnings: 0,
            exists: true
        });

        emit StickerPackCreated(nextStickerPackId, _cid, msg.sender);
        nextStickerPackId++;
    }


    /**
     * @dev Increments the download count for a specific sticker pack and pays the creator.
     * @param _stickerPackId The ID of the sticker pack that was downloaded.
     */
    function downloadStickerPack(uint256 _stickerPackId) public payable stickerPackExists(_stickerPackId) {
        require(msg.value >= pricePerDownload, "Insufficient funds. Please send at least 0.1 USD (in wei).");

        stickerPacks[_stickerPackId].downloadCount++;
        stickerPacks[_stickerPackId].creatorEarnings += pricePerDownload;

        // Optional: Refund excess payment (if any)
        if (msg.value > pricePerDownload) {
            payable(msg.sender).transfer(msg.value - pricePerDownload);
        }

        emit StickerPackDownloaded(_stickerPackId, msg.sender);
    }


    /**
     * @dev Allows the creator to withdraw their accumulated earnings.
     * @param _stickerPackId The ID of the sticker pack to withdraw earnings from.
     */
    function withdrawEarnings(uint256 _stickerPackId) public stickerPackExists(_stickerPackId) {
        require(stickerPacks[_stickerPackId].creator == msg.sender, "Only the creator can withdraw earnings.");
        require(stickerPacks[_stickerPackId].creatorEarnings > 0, "No earnings to withdraw.");

        uint256 amountToWithdraw = stickerPacks[_stickerPackId].creatorEarnings;
        stickerPacks[_stickerPackId].creatorEarnings = 0;

        // Transfer the earnings to the creator
        payable(msg.sender).transfer(amountToWithdraw);

        emit CreatorPaid(_stickerPackId, msg.sender, amountToWithdraw);
    }


    /**
     * @dev Allows the contract owner to withdraw funds from the contract.
     */
    function withdrawContractBalance() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw.");

        // Transfer the balance to the owner
        owner.transfer(balance);
    }


    /**
     * @dev Allows the owner to transfer ownership of the contract to another address.
     * @param newOwner The address of the new owner.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address.");
        emit OwnershipTransferred(owner, newOwner);
        owner = payable(newOwner);
    }

    /**
     * @dev Changes the price per download (in cents of a dollar).  Can only be called by the owner.
     * @param _newPricePerDownload The new price per download in cents of a dollar.
     */
    function setPricePerDownload(uint256 _newPricePerDownload) public onlyOwner {
        pricePerDownload = _newPricePerDownload;
    }

    /**
     * @dev Returns the CID of a sticker pack by its ID.
     * @param _stickerPackId The ID of the sticker pack.
     */
    function getStickerPackCID(uint256 _stickerPackId) public view stickerPackExists(_stickerPackId) returns (string memory) {
        return stickerPacks[_stickerPackId].cid;
    }

     /**
     * @dev Returns the number of downloads of a sticker pack by its ID.
     * @param _stickerPackId The ID of the sticker pack.
     */
    function getStickerPackDownloadCount(uint256 _stickerPackId) public view stickerPackExists(_stickerPackId) returns (uint256) {
        return stickerPacks[_stickerPackId].downloadCount;
    }
}