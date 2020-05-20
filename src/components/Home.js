import React from 'react';
import {
  Grid,
  Segment,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import ListTable from './ListTable';
import List from './List';

function Home() {

  return (
    <div className="App">
      <Grid
        style={{ height: '90vh' }}
        columns={2}
        relaxed
        divided
        stretched
      >
        <Grid.Column stretched width={4}>
          <Segment style={{ marginLeft: '1rem'}}>
            <ListTable/>
          </Segment>
        </Grid.Column>

        <Grid.Column stretced width={12}>
          <List/>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Home;
