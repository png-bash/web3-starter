// SPDX-License-Identifier: GLWTPL
pragma solidity >= 0.8.0;

contract CounterV2 {
    uint256 public count;
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    function increment() public {
        require(msg.sender == owner, "Only owner can increment the count");
        count += 1;
    }

    function decrement() public {
        require(msg.sender == owner, "Only owner can decrement the count");
        count -= 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
