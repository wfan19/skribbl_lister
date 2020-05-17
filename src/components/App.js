/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';

function App() {
  return (
    <AppContainer>
      <Router>
        <Navigation />
      </Router>
    </AppContainer>
  );
}

export default App;
