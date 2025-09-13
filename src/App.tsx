import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ModalProvider } from './contexts/ModalContext';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import Feed from './pages/Feed';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ModalProvider>
          <div className="App">
            <h1>Test - App is working!</h1>
            <Header />
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
            <AuthModal />
          </div>
        </ModalProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
