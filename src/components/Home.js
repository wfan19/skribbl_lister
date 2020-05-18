import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  Segment,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import ListTable from './ListTable';

function Home() {

  return (
    <div className="App">
      <Segment style={{ marginLeft: '10vw', marginRight: '10vw' }}>
        <Grid
          centered
          textAlign="center"
          divided
          relaxed
        >
          <Grid.Row columns={2}>
            <Grid.Column verticalAlign="top">
              <p>Welcome to the Ultimate Skribbl.io Experience</p>
            </Grid.Column>

            <Grid.Column verticalAlign="top">
              <Link to="/list/1234">
                <Button primary> Click here to get started </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {
          //TODO: Create table items that actually show up properly
        }
        <ListTable/>
      </Segment>
    </div>
  );
}

export default Home;
