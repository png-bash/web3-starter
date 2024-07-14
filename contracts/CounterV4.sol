// SPDX-License-Identifier: GLWTPL
pragma solidity >= 0.8.0;

contract CounterV4 {
    mapping(address => uint256) private count;

    function increment() public {
        count[msg.sender] += 1;
    }

    function getCount() public view returns (uint256) {
        return count[msg.sender];
    }

    function getCountFor(address _owner) public view returns (uint256) {
        return count[_owner];
    }
}
