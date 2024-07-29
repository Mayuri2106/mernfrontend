import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import LandingPage2 from './components/LandingPage2';
import LandingPage3 from './components/LandingPage3';
import LandingPage4 from './components/LandingPage4';
import LandingPage5 from './components/LandingPage5';
import LandingPage6 from './components/LandingPage6';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import FormDashboard from './components/FormDashboard';
import SettingsPage from './components/SettingsPage';
import Workspace from './components/Workspace';
import ChatView from './components/ChatView';
import FormResponse from './components/FormResponse';






const App = () => {
  return (
    <Router>
      <div style={{ backgroundColor: 'black' }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Header />
                <LandingPage />
                <LandingPage2 />
                <LandingPage3 />
                <LandingPage4 />
                <LandingPage5 />
                <LandingPage6 />
                <Footer/>
              </>
            } 
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/FormDashboard" element={<FormDashboard />} />
          <Route path="/setting" element={<SettingsPage/>} />
          <Route path="/Workspace" element={<Workspace/>} />
          <Route path='/ChatView' element={<ChatView/>} />
        <Route path="/FormResponse/:id" element={<FormResponse />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
