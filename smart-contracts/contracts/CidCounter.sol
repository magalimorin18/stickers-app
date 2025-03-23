// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CidCounter {
    address public owner;
    mapping(string => uint256) public cidCounters;

    event CidAdded(string cid, uint256 count);
    event CidIncremented(string cid, uint256 newCount);

    constructor() {
        owner = msg.sender; // The deployer becomes the owner
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function addCid(string memory cid) public {
        require(cidCounters[cid] == 0, "CID already exists");
        cidCounters[cid] = 1;
        emit CidAdded(cid, 1);
    }

    function incrementCid(string memory cid) public {
        require(cidCounters[cid] > 0, "CID does not exist");
        cidCounters[cid]++;
        emit CidIncremented(cid, cidCounters[cid]);
    }

    function getCidCount(string memory cid) public view returns (uint256) {
        return cidCounters[cid];
    }

    function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0), "Invalid address");
    owner = newOwner;
}
}
