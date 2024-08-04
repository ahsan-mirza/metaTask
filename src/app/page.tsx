import Header from '@/components/Header/Header';
import { ReactNode } from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <Header />
      <main className="relative flex flex-col items-center justify-center flex-grow p-6 text-white">
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 rounded-lg shadow-lg bg-opacity-80 bg-slate-800">
          <h1 className="text-5xl font-bold mb-4">Welcome to the Web3 App</h1>
          <p className="text-xl mb-8">You are logged in with MetaMask</p>
          <button
            // onClick={() => alert('Explore more!')}
            className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Explore More
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
