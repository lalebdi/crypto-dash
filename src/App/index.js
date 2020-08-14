import React from 'react';
import './App.css';
import AppBar from './AppBar';
import AppLayout from './AppLayout';
import {AppProvider} from './AppProvider';
import Settings from '../Settings/Index';
import Content from '../Shared/Content';
import Dashboard from '../Dashboard/Index'

function App() {
  return (
    <AppLayout>
      <AppProvider>
      <AppBar />
      <Content>
      <Settings />
      <Dashboard />
      </Content>
    </AppProvider>
    </AppLayout>
  );
}

export default App;
