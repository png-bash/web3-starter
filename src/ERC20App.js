
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import contractArtifact from '@openzeppelin/contracts/build/contracts/ERC20.json';

export function ERC20App() {
  const [provider, setProvider] = useState(null);
  const [network, setNetwork] = useState('');
  const [contract, setContract] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventCount, setEventCount] = useState(0);

  const initializeProvider = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/base');
    setProvider(provider);

    // if (window.ethereum) {
    //   await window.ethereum.request({ method: 'eth_requestAccounts' });
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   setProvider(provider);

    //   window.ethereum.on('chainChanged', () => {
    //     window.location.reload();
    //   });

    //   window.ethereum.on('accountsChanged', () => {
    //     window.location.reload();
    //   });
    // } else {
    // }
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
      const contractAddress = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913';
      const contract = new ethers.Contract(contractAddress, contractArtifact.abi, provider);
      setContract(contract);
    }
  }, [provider]);

  useEffect(() => {
    if (contract) {
      console.log('contract set getting count', contract);
      contract.on('Transfer', (from, to, value) => {
        // console.log('Transfer event', from, to, value);
        setEvents(events => [{ from, to, value }, ...events]);
        setEventCount(eventCount => eventCount + 1);
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
      <p>Event count: {eventCount}</p>
      {
        events.map((event, index) => (
          <div key={index}>
            <p>
              From: {event.from}<br />
              To: {event.to}<br />
              Value: {event.value.toString()}
            </p>
          </div>
        ))
      }
    </div>
  );
}



