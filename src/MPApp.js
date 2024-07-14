import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import contractArtifact from '../artifacts/contracts/MarketplaceV2.sol/MarketplaceV2.json';

const erc20Artifact = require('@openzeppelin/contracts/build/contracts/ERC20.json');
const usdcAddress = "0x036cbd53842c5426634e7929541ec2318f3dcf7e";

export function MPApp() {
    const [provider, setProvider] = useState(null);
    const [network, setNetwork] = useState('');
    const [contract, setContract] = useState(null);
    const [products, setProducts] = useState([]);
    const [signer, setSigner] = useState(null);

    const initializeProvider = async () => {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
            const signer = provider.getSigner();
            setSigner(signer);

            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });

            window.ethereum.on('accountsChanged', () => {
                window.location.reload();
            });
        }
    };

    const getNetwork = async () => {
        if (provider) {
            const network = await provider.getNetwork();
            setNetwork(network.name);
        }
    };
    useEffect(() => {
        getNetwork();
    }, [provider]);

    useEffect(() => {
        if (provider) {
            const contractAddress = '0xC57f3a8ed810d812E196d73736d267cfE1090EFf';
            const contract = new ethers.Contract(contractAddress, contractArtifact.abi, signer);
            setContract(contract);
        }
    }, [provider]);

    useEffect(() => {
        if (contract) {
            contract.getProducts().then((products) => {
                const _products = products.map((product) => {
                    return {
                        id: product.id.toNumber(),
                        name: product.name,
                        price: product.price,
                        quantity: product.quantity
                    };
                });
                setProducts(_products);
            });

            // contract.on('ProductCreated', (productId, name, price, quantity, owner) => {
            //     setProducts((products) => {
            //         return [...products, { id: productId.toNumber(), name, price, quantity }];
            //     });
            // });

            contract.on('OrderExecuted', (productId, quantity, buyer) => {
                setProducts((products) => {
                    return products.map((product) => {
                        if (product.id === productId.toNumber()) {
                            console.log("product updated", product.id);
                            return { ...product, quantity: product.quantity.sub(quantity) };
                        }
                        return product;
                    });
                });
            });
        }
    }, [contract]);

    return (
        <div>
            <h1>My Awesome dApp</h1>
            {!provider &&
                <button onClick={initializeProvider} >
                    Connect Wallet
                </button>
            }
            {provider &&
                <Seller signer={signer} contract={contract} />
            }

            {signer && products.map((product, index) => {
                return <Product key={index} product={product} signer={signer} contract={contract} />;
            })

            }
        </div>
    );
}

function Product({ product, signer, contract }) {
    const [isBuy, setBuy] = useState(false);
    const [qty, setQty] = useState('');

    function showBuyProperties() {
        setBuy(true);
    }

    async function executeOrder() {
        const signerAddress = await signer.getAddress();

        const usdc = new ethers.Contract(usdcAddress, erc20Artifact.abi, signer);
        const allowance = await usdc.allowance(signerAddress, contract.address);
        console.log("allowance:", allowance);

        const value = product.price.mul(qty);
        if (allowance.lt(value)) {
            const txn = await usdc.approve(contract.address, value);
            const rec = await txn.wait();
            console.log("rec:", rec);
        }

        const txn = await contract.executeOrder({
            productId: product.id,
            quantity: parseInt(qty)
        });
        const rec = await txn.wait();
        console.log("rec:", rec);
    }

    function handleChange(e) {
        setQty(e.target.value);
    }

    return (
        <div className="product" >
            <h3>{product.name}</h3>
            <p>Price: {ethers.utils.formatUnits(product.price, 6)}</p>
            <p>Quantity: {product.quantity.toNumber()}</p>
            {!isBuy &&
                <button onClick={showBuyProperties}>Buy</button>
            }
            {isBuy &&
                <div>
                    <input type="number" placeholder="Quantity" onChange={handleChange} value={qty} />
                    <button onClick={executeOrder}>Buy</button>
                </div>
            }
        </div>
    );
}

function Seller({ signer, contract }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState('');

    function onNameChange(e) {
        setName(e.target.value);
    }
    function onPriceChange(e) {
        setPrice(e.target.value);
    }
    function onQtyChange(e) {
        setQty(e.target.value);
    }

    async function addProduct() {
        const _price = ethers.utils.parseUnits(price, 6);
        console.log(_price.toNumber());
        const txn = await contract.addProduct(name, _price, qty);
        const rec = await txn.wait();
        console.log("rec:", rec);
    }

    return (
        <div>
            <h2>Sell your products</h2>
            <input type="text" placeholder="Product Name" value={name} onChange={onNameChange} /><br />
            <input type="number" placeholder="Price" value={price} onChange={onPriceChange} /><br />
            <input type="number" placeholder="Quantity" value={qty} onChange={onQtyChange} /><br />
            <button onClick={addProduct}>Add Product</button>
        </div>
    );
}

