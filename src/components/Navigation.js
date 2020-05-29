import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import HeaderBar from './HeaderBar';
import 'semantic-ui-css/semantic.min.css';

const Home = lazy(() => import('./Home'));

const Loading = (
  <div>
    <Dimmer active>
      <Loader/>
    </Dimmer>
  </div>
)

function Navigation(){
  return (
    <div>
      <HeaderBar>
          <Suspense fallback={Loading}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/list/:listId" component={Home} />
              {/* { (user.id || user.fetching)
                && (<Route exact path="/profile" component={Profile} user={user} />)} */}
              <Redirect to="/" />
            </Switch>
          </Suspense>
      </HeaderBar>
    </div>
  )
}

export default Navigation;
