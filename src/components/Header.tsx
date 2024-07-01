import React, { useEffect } from 'react';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/authProvider.tsx';
import HeaderMobile from './HeaderMobile.tsx';
import HeaderDesktop from './HeaderDesktop.tsx';


type HeaderProps = {
  onLoginClick: () => void;
  onSignUpClick: () => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const Header: React.FC<HeaderProps> = ({
  onLoginClick,
  onSignUpClick,
  searchTerm,
  setSearchTerm,
}) => {
  const { logout, isAuthenticated, checkIfIsAuthenticated } = useAuth();

  useEffect(() => {
    checkIfIsAuthenticated();
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="flex justify-between items-center w-full md:w-full">
        <img
          src={logo}
          alt="Logo BuglifeDev"
          className="h-10 w-10 md:h-14 md:w-14 rounded-full hover:scale-125 transition-transform duration-300"
        />
        <div className="flex-grow ml-4 md:mt-0 flex justify-center">
          <input
            type="search"
            className="w-full px-1 py-2 rounded-lg md:w-2/3 lg:w-2/3 text-gray-700 focus:outline-none placeholder-grey justify-self-center"
            placeholder="Faça sua pesquisa :)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>
      <HeaderMobile
        onLoginClick={onLoginClick}
        onSignUpClick={onSignUpClick}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
      <HeaderDesktop
        onLoginClick={onLoginClick}
        onSignUpClick={onSignUpClick}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
