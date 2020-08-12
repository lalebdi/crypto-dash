import React from 'react';
import './App.css';
import WelcomeMessage from './WelcomeMessage';
import AppBar from './AppBar';
import AppLayout from './AppLayout';
import {AppProvider} from './AppProvider';


function App() {
  return (
    <AppLayout>
      <AppProvider>
      <AppBar />
    <WelcomeMessage />
    </AppProvider>
    </AppLayout>
  );
}

export default App;
