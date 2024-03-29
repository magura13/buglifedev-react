import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col w-1/4">
      <div className='flex justify-between'>
        <div className='flex'>
          <p className='text-2xl text-custom-blue font-semibold'> BugLife</p>
          <p className='text-2xl text-custom-yellow font-semibold'> Dev</p>
        </div>
        <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-0.5 rounded mb-3.5 self-end" 
            >
              X
            </button>
      </div>
      
        {children}

        <div className="flex justify-end mt-4">

        </div>
      </div>
    </div>
  );
};

export default Modal;
