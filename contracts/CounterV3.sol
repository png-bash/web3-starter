// SPDX-License-Identifier: GLWTPL
pragma solidity >= 0.8.0;

contract CounterV3 {
    uint256 public count;
    mapping(address => bool) private owners;

    constructor() {
        owners[msg.sender] = true;
    }

    function increment() public {
        require(owners[msg.sender], "Only owner can increment the count");
        count += 1;
    }

    function decrement() public {
        require(owners[msg.sender], "Only owner can decrement the count");
        count -= 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }

    function addOwner(address _owner) public {
        require(owners[msg.sender], "Only owner can add another owner");
        owners[_owner] = true;
    }

    function removeOwner(address _owner) public {
        require(owners[msg.sender], "Only owner can remove another owner");
        owners[_owner] = false;
    }
}
