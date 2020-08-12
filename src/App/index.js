import React from 'react';
import './App.css';
import AppBar from './AppBar';
import AppLayout from './AppLayout';
import {AppProvider} from './AppProvider';
import Settings from '../Settings/Index';


function App() {
  return (
    <AppLayout>
      <AppProvider>
      <AppBar />
      <Settings />
    </AppProvider>
    </AppLayout>
  );
}

export default App;
