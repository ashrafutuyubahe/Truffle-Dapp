import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MessageBoardABI from './abi/MessageBoard.json';

const CONTRACT_ADDRESS = "0xA4ab97CBFcE91E2E86602CcCC934997293F96df3";

function App() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        try {
          // Connect to MetaMask
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const prov = new ethers.BrowserProvider(window.ethereum);
          const signer = await prov.getSigner();
         const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, MessageBoardABI.abi, signer);

          setProvider(prov);
          setSigner(signer);
          setContract(contractInstance);

          fetchMessage(contractInstance);

          // Auto-refresh on account or chain change
          window.ethereum.on('accountsChanged', () => window.location.reload());
          window.ethereum.on('chainChanged', () => window.location.reload());
        } catch (err) {
          console.error("MetaMask connection error:", err);
        }
      } else {
        alert("MetaMask not detected. Please install it from https://metamask.io/");
      }
    };

    loadProvider();
  }, []);

  const fetchMessage = async (contractInstance) => {
    try {
      const message = await contractInstance.message();
      setCurrentMessage(message);
    } catch (err) {
      console.error("Failed to fetch message:", err);
    }
  };

  const updateMessage = async () => {
    if (!newMessage || !contract) return;
    try {
      const tx = await contract.updateMessage(newMessage); // ✅ Correct function name
      await tx.wait();
      fetchMessage(contract);
      setNewMessage('');
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed: " + err.message);
    }
  };

  const clearMessage = async () => {
    if (!contract) return;
    try {
      const tx = await contract.clearMessage();
      await tx.wait();
      fetchMessage(contract);
    } catch (err) {
      console.error("Clear failed:", err);
      alert("Clear failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>📬 Message Board DApp</h2>
      <p><strong>Current Message:</strong> {currentMessage || "(empty)"}</p>

      <input
        type="text"
        placeholder="Enter new message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        style={{ padding: '0.5rem', width: '300px', marginBottom: '1rem' }}
      />
      <div>
        <button onClick={updateMessage} style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>
          Update
        </button>
        <button onClick={clearMessage} style={{ padding: '0.5rem 1rem' }}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
