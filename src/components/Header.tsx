import React from 'react';

type HeaderProps = {
  onLoginClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      {/* Outros elementos */}
      <nav>
        <ul className="flex">
          <li className="ml-6 cursor-pointer" onClick={onLoginClick}>
            login
          </li>
          {/* Outros itens */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
