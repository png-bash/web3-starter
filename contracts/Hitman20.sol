// SPDX-License-Identifier: GLWTPL
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Hitman20 {
    address private owner;

    string public name;
    string public symbol;
    uint256 public decimals;
    uint256 public supply;

    constructor(string memory _name, string memory _symbol, uint256 _decimals, uint256 _totalSupply) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        supply = _totalSupply;
        balance[address(this)] = _totalSupply;
    }

    // mapping of address to balance
    mapping (address=>uint256) balance;
    // mapping of address to mapping of address to allowance
    mapping (address=>mapping(address=>uint256)) allowanceMap;

    function totalSupply() external view returns (uint256) {
        return supply;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balance[account];
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(balance[msg.sender] >= value, "not enough balance");
        balance[msg.sender] -= value;
        balance[to] += value;
        return true;
    }

    function allowance(address _owner, address spender) external view returns (uint256) {
        return allowanceMap[_owner][spender];
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowanceMap[msg.sender][spender] = value;
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        require(balance[from] >= value, "not enough balance");
        require(allowanceMap[from][msg.sender] >= value, "not enough allowance");
        balance[from] -= value;
        balance[to] += value;
        allowanceMap[from][msg.sender] -= value;
        return true;
    }

    function createNewTokens(address to, uint256 value) external {
        require(msg.sender == owner, "only owner can airdrop");
        balance[to] += value;
        supply += value;
    }

    function airdrop(address to, uint256 value) external {
        require(msg.sender == owner, "only owner can airdrop");
        require(balance[address(this)] >= value, "not enough balance");
        balance[to] += value;
        balance[address(this)] -= value;
    }
}
