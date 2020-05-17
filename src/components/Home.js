import React from 'react';
import { Button, Grid, GridColumn } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

function Home() {
  return (
    <div className="App">
      <Grid
        columns={2}
        centered
        textAlign="center"
        divided
        relaxed
        style={{ height: '100vh' }}
      >
        <GridColumn verticalAlign="middle">
          <p>Welcome to the Ultimate Skribbl.io Experience</p>
        </GridColumn>

        <GridColumn verticalAlign="middle">
          <Link to="/list/1234">
            <Button primary> Click here to get started </Button>
          </Link>
        </GridColumn>
      </Grid>
    </div>
  );
}

export default Home;
