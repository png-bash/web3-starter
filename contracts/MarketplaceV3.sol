// SPDX-License-Identifier: GLWTPL
pragma solidity >= 0.8.0;

import "./CounterV4.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MarketplaceV3 {

    CounterV4 private counter;
    IERC20 private usdc;

    constructor(CounterV4 _counter, IERC20 _token) {
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

    event ProductCreated(uint256 id, string name, uint256 price, uint256 quantity, address owner);
    event OrderExecuted(uint256 productId, uint256 quantity, address buyer);

    function addProduct(string memory _name, uint _price, uint _quantity) public returns (uint256) {
        uint256 _id = counter.getCount();
        products[_id] = Product(_id, _name, _price, _quantity, msg.sender);
        emit ProductCreated(_id, _name, _price, _quantity, msg.sender);
        counter.increment();
        return _id;
    }

    function getProductCount() public view returns (uint256) {
        return counter.getCount();
    }

    function getProducts() public view returns (Product[] memory) {
        Product[] memory _products = new Product[](counter.getCount());
        for (uint256 i = 0; i < counter.getCount(); i++) {
            _products[i] = products[i];
        }
        return _products;
    }

    function getProduct(uint256 _id) public view returns (Product memory) {
        return products[_id];
    }

    function executeOrder(Order calldata _order) public payable {
        Product memory p = products[_order.productId];
        require(p.quantity >= _order.quantity, "not enough quantity");

        if (msg.value == 0) {
            require(usdc.balanceOf(msg.sender) >= value, "not enough user funds");

            uint256 allowance = usdc.allowance(msg.sender, address(this));
            require(allowance >= value, "not enough allowance to transfer funds");

            usdc.transferFrom(msg.sender, p.owner, value);
        } else {
            uint256 value = p.price*_order.quantity;
            require(value == msg.value, "incorrect value sent");
            payable(p.owner).transfer(msg.value);
        }

        p.quantity = p.quantity - _order.quantity;
        products[p.id] = p;
        emit OrderExecuted(_order.productId, _order.quantity, msg.sender);
    }

}
