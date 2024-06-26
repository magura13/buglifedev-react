import React, { useState, useEffect } from 'react';
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

  const { logout, isAuthenticated, checkIfIsAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    checkIfIsAuthenticated();
  }, []);

  const handleLogout = () => {
    logout();
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className="bg-blue-500 text-white p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="flex justify-between items-center w-full md:w-full">
        <img
          src={logo}
          alt="Logo BuglifeDev"
          className="h-10 w-10 md:h-14 md:w-14 rounded-full hover:scale-125 transition-transform duration-300"
        />
        <div className="flex-grow mx-4 md:mt-0 flex justify-center">
          <input
            type="search"
            className="w-full px-4 py-2 rounded-lg md:w-2/3 lg:w-2/3 text-gray-700 focus:outline-none placeholder-grey justify-self-center"
            placeholder="Faça sua pesquisa :)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <nav className={`w-full md:w-auto ${menuOpen ? 'block' : 'hidden'} md:flex`}>
        <ul className="flex flex-col md:flex-row items-center">
          {!isAuthenticated ? (
            <>
              <li className="mt-2 md:mt-0 md:ml-6 cursor-pointer whitespace-nowrap" onClick={onLoginClick}>
                Login
              </li>
              <li className="mt-2 md:mt-0 md:ml-6 cursor-pointer whitespace-nowrap" onClick={onSignUpClick}>
                Cadastre-se
              </li>
            </>
          ) : (
            <li className="mt-2 md:mt-0 md:ml-6 cursor-pointer whitespace-nowrap" onClick={handleLogout}>
              Logout
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
