import React from 'react';
import './App.css';
import WelcomeMessage from './WelcomeMessage';
import AppBar from './AppBar';
import AppLayout from './AppLayout';



function App() {
  return (
    <AppLayout>
      <AppBar />
    <WelcomeMessage />
    </AppLayout>
  );
}

export default App;
