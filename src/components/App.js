import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Button, Grid, GridColumn } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <AppContainer>
      <div className="App">
        <header className="App-header">
          <Grid 
            columns={2}
            centered
            textAlign='center'
            divided
            relaxed
            style={{ height: '100vh' }}
          >
            <GridColumn verticalAlign='middle'>
              <p>
              Welcome to the Ultimate <code>Skribbl.io</code> Experience
              </p>
            </GridColumn>
            
            <GridColumn verticalAlign='middle'>
              <Button primary> Click here to get started </Button>
            </GridColumn>
          </Grid>
        </header>
      </div>
    </AppContainer>
  );
}

export default App;
