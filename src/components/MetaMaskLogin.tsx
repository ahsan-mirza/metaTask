'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const MetaMaskLogin: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  useEffect(() => {
    const checkCookie = async () => {
      try {
        const response = await fetch('/api/check-session');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.account) {
          setAccount(data.account);
          router.push('/'); // Redirect to home page if account exists
        } else {
          setAccount(null);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        setError('Failed to fetch session data.');
      }
    };

    checkCookie();
  }, [router]);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount(null);
      setError('Please connect to MetaMask.');
    } else {
      setAccount(accounts[0]);
    }
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setError(null);

        // Save the account in cookies
        await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ account: accounts[0] }),
        });

        // Redirect to home page after successful login
        router.push('/');
      } catch (err) {
        if (err instanceof Error) {
          if (err.code === 4001) {
            setError('User rejected the request.');
          } else {
            console.error(err);
            setError('An error occurred. Check the console for details.');
          }
        }
      }
    } else {
      setError('MetaMask is not installed. Please install it to use this app.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-10 rounded-xl shadow-2xl max-w-md w-full text-center">
      {/* <div className="relative group">
        <Image 
          src={logo}
          alt="MetaMask Logo" 
          width={100} 
          height={100} 
          className="mx-auto mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
        />
      </div> */}
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Web3 Login</h2>
      {account ? (
        <div className="text-center">
          <p className="text-lg text-gray-800">Connected Account:</p>
          <p className="text-lg font-mono text-blue-600 break-words">{account}</p>
        </div>
      ) : (
        <button
          onClick={connectMetaMask}
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Connect with MetaMask
        </button>
      )}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default MetaMaskLogin;