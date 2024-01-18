import React from 'react';
import Button from '../../components/Button/Button.tsx';

const HomePage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">bugLifeDev</h1>
      <Button label="Hello World!!" onClick={() => console.log('clickeeeed')} />
    </div>
  );
};

export default HomePage;
