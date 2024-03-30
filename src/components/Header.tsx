import React, { useContext, useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/authProvider.tsx';

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

  const {logout,isAuthenticated, checkIfIsAuthenticated} = useAuth()

  useEffect(() => {
    checkIfIsAuthenticated()
  }, []);

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <img
        src={logo}
        alt="Logo BuglifeDev"
        className="h-14 w-14 rounded-full hover:scale-125 transition-transform duration-300"
      />
      <div className="flex-grow mx-4">
        <div className="relative">
          <input
            type="search"
            className="w-2/4 px-4 py-2 rounded-lg text-gray-700 focus:outline-none placeholder-grey"
            placeholder="Faça sua pesquisa :)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button className="absolute right-0 top-0 mt-2 mr-4"></button>
        </div>
      </div>
      {!isAuthenticated ? <nav>
        <ul className="flex">
          <li className="ml-6 cursor-pointer" onClick={onLoginClick}>
            login
          </li>
          <li className="ml-6 cursor-pointer" onClick={onSignUpClick}>
            cadastre
          </li>
        </ul>
      </nav> : 
      <nav>
      <ul className="flex">
        <li className="ml-6 cursor-pointer" onClick={handleLogout}>
          logout
        </li>
      </ul>
    </nav>
      }
      
    </header>
  );
};

export default Header;
