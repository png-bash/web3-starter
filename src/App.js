import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import contractArtifact from '../artifacts/contracts/CounterV1.sol/CounterV1.json';

export function App() {
  const [provider, setProvider] = useState(null);
  const [network, setNetwork] = useState('');
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [count, setCount] = useState(0);

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

  const increment = async () => {
    if (contract) {
      try {
        const tx = await contract.increment();
        await tx.wait();
        const newCount = await contract.getCount();
        setCount(newCount.toNumber());  
      } catch (err) {
        console.error('error', err);
      }
    }
  }

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
      const contractAddress = '0x4Cb1564Ea65E46A45a378500294cE69a32c8D904';
      const contract = new ethers.Contract(contractAddress, contractArtifact.abi, signer);
      setContract(contract);
    }
  }, [provider]);

  useEffect(() => {
    if (contract) {
      console.log('contract set getting count', contract);
      contract.getCount().then((count) => {
        console.log('count', count);
        setCount(count.toNumber());
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
      <p>Connected to network: {network}</p>
      {contract &&
        <button onClick={increment} >
          increment
        </button>
      }
      <p>Count: {count}</p>
    </div>
  );
}
