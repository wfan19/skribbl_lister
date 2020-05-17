/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Provider from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import { store, history } from './store';

function App() {
  return (
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Navigation />
        </Router>
      </Provider>
    </AppContainer>
  );
}

export default App;
