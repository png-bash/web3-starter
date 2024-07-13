// SPDX-License-Identifier: GLWTPL
pragma solidity >= 0.8.0;

import "./CounterV3.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Marketplace {

    CounterV3 private counter;
    IERC20 private usdc;

    constructor(CounterV3 _counter, IERC20 _token) {
        counter = _counter;
        usdc = _token;
    }

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        uint256 quantity;
        address owner;
    }
    mapping(uint256 => Product) private products;

    struct Order {
        uint256 productId;
        uint256 quantity;
    }

    function addProduct(string memory _name, uint _price, uint _quantity) public {
        counter.increment();
        uint256 _id = counter.getCount();
        Product(_id, _name, _price, _quantity, msg.sender);
    }

    // function getProducts() public view returns (mapping(int256 => Product) memory products) {

    // }

    function getProduct(uint256 _id) public view returns (Product memory) {
        return products[_id];
    }

    function executeOrder(Order calldata _order) public {
        Product memory p = products[_order.productId];
        require(p.quantity >= _order.quantity, "not enough quantity");

        uint256 value = p.price*_order.quantity;
        require(usdc.balanceOf(msg.sender) >= value, "not enough user funds");

        uint256 allowance = usdc.allowance(msg.sender, address(this));
        require(allowance >= value, "not enough allowance to transfer funds");

        usdc.transferFrom(msg.sender, p.owner, value);

        p.quantity = p.quantity - _order.quantity;
        products[p.id] = p;
    }

}
