import MetaMaskLogin from '../../components/MetaMaskLogin';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <MetaMaskLogin />
    </div>
  );
};

export default LoginPage;