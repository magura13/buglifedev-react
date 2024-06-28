import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

type HeaderMobile = {
  onLoginClick: () => void;
  onSignUpClick: () => void;
  isAuthenticated: boolean;
  handleLogout: () => void;
};

const HeaderMobile: React.FC<HeaderMobile> = ({ onLoginClick, onSignUpClick, isAuthenticated, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='md:hidden lg:hidden flex justify-center flex-col align-center mt-4'>
      <div className='justify-center flex'>
        <button className="text-white focus:outline-none items-center" onClick={toggleMenu}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <nav className="md:hidden lg:hidden">
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: menuOpen ? 1 : 0, height: menuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex flex-col md:flex-row items-center ${menuOpen ? 'block' : 'hidden'}`}
        >
          {!isAuthenticated ? (
            <>
              <li className="mt-2 md:mt-0 md:ml-6 cursor-pointer whitespace-nowrap flex items-center" onClick={onLoginClick}>
                <FontAwesomeIcon icon={faFaceSmile} className="mr-2" />
                Login
              </li>
              <li className="mt-2 md:mt-0 md:ml-6 cursor-pointer whitespace-nowrap flex items-center" onClick={onSignUpClick}>
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Cadastre-se
              </li>
            </>
          ) : (
            <li className="mt-2 md:mt-0 md:ml-6 cursor-pointer whitespace-nowrap flex items-center" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </li>
          )}
        </motion.ul>
      </nav>
    </div>

  );
};

export default HeaderMobile;
