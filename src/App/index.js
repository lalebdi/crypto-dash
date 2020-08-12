import React from 'react';
import './App.css';
import WelcomeMessage from './WelcomeMessage';
import styled, {css} from 'styled-components';
import AppLayout from './AppLayout'


function App() {
  return (
    <AppLayout>
    <WelcomeMessage />
    </AppLayout>
  );
}

export default App;
