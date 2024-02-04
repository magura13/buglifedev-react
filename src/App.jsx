import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginForm from './components/LoginForm.tsx';
import useModal from './hooks/useModal.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Modal from './components/Modal.tsx';
import SignUpForm from './components/SignupForm.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalContent, setModalContent] = useState('login');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLoginClick = () => {
    setModalContent('login');
    openModal();
  };

  const handleSignUpClick = () => {
    setModalContent('signup');
    openModal();
  };

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Header
          onLoginClick={handleLoginClick}
          onSignUpClick={handleSignUpClick}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {modalContent === 'login' ? (
            <LoginForm onClose={closeModal} />
          ) : (
            <SignUpForm onClose={closeModal} />
          )}
        </Modal>
        <Routes>
          <Route path="/" element={<HomePage searchTerm={searchTerm} />} />{' '}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
