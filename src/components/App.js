import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Button, Grid, GridColumn } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <AppContainer>
      <div className="App">
        <header className="App-header">
          <Grid columns="2" divided relxaed>
            <GridColumn>
              <p>
              Welcome to the Ultimate <code>Skribbl.io</code> Experience
              </p>
            </GridColumn>
            
            <GridColumn>
              <Button primary> Click here to get started </Button>
            </GridColumn>
          </Grid>
        </header>
      </div>
    </AppContainer>
  );
}

export default App;
