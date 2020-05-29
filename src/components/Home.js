import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import {
  Grid,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import ListTable from './ListTable';

const List = lazy(() => import('./List'))

const Loading = (
  <div>
    <Loader/>
  </div>
)

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
          <Suspense fallback={Loading}>
            <Route path="/list/:listId" component={List} />
          </Suspense>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Home;
