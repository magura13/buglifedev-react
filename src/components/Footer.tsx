import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Comunidade BugLifeDev 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
