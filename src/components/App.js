/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'connected-react-router';
import Navigation from './Navigation';
import { store, history } from '../store';

function App() {
  return (
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history} noInitialPop>
          <Navigation />
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  );
}

export default App;
