// SPDX-License-Identifier: GLWTPL
pragma solidity >= 0.8.0;

contract CounterV1 {
    uint256 public count;

    function increment() public {
        count += 1;
    }

    function decrement() public {
        count -= 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
