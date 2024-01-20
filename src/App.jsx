import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginForm from './components/LoginForm.tsx';
import useModal from './hooks/useModal.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Modal from './components/Modal.tsx';
import SignUpForm from './components/SignupForm.tsx';

function App() {
  const { isModalOpen, openModal, closeModal } = useModal();
  console.log(process.env.REACT_APP_API_BEARER_TOKEN, process.env.REACT_APP_API_URL)

  return (
    <Router>
      <div className="App">
        <Header onLoginClick={openModal} />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <LoginForm />
        </Modal>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
