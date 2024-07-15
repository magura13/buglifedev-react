import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

type HeaderDesktop = {
  onLoginClick: () => void;
  onSignUpClick: () => void;
  isAuthenticated: boolean;
  handleLogout: () => void;
};

const HeaderDesktop: React.FC<HeaderDesktop> = ({
  onLoginClick,
  onSignUpClick,
  isAuthenticated,
  handleLogout,
}) => {
  return (
    <nav className="hidden md:flex">
      <ul className="flex flex-row items-center">
        {!isAuthenticated ? (
          <>
            <li
              className="mt-2 md:mt-0 md:ml-6 cursor-pointer whitespace-nowrap flex items-center"
              onClick={onLoginClick}
            >
              <FontAwesomeIcon icon={faFaceSmile} className="mr-2" />
              Login
            </li>
            <li
              className="mt-2 md:mt-0 md:ml-6 cursor-pointer whitespace-nowrap flex items-center"
              onClick={onSignUpClick}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Cadastre-se
            </li>
          </>
        ) : (
          <li
            className="mt-2 md:mt-0 md:ml-6 cursor-pointer whitespace-nowrap flex items-center"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </li>
        )}
      </ul>
    </nav>
  );
};

export default HeaderDesktop;
