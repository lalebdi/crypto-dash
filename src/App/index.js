import React from 'react';
import './App.css';
import AppBar from './AppBar';
import AppLayout from './AppLayout';
import {AppProvider} from './AppProvider';
import Settings from '../Settings/Index';
import Content from '../Shared/Content'

function App() {
  return (
    <AppLayout>
      <AppProvider>
      <AppBar />
      <Content>
      <Settings />
      </Content>
    </AppProvider>
    </AppLayout>
  );
}

export default App;
