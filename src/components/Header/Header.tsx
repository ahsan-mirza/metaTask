'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
    
      await fetch('/api/logout', { method: 'POST' });

      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Web3 App</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
