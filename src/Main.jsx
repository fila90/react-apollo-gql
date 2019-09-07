import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import RouteLoader from './components/styled/RouteLoader'

const List = lazy(() => import('./views/List'));
const Edit = lazy(() => import('./views/Edit'));
const Create = lazy(() => import('./views/Create'));

export default function Main() {
  return (
    <Router>
      <Suspense fallback={<RouteLoader>Loading...</RouteLoader>}>
        <Switch>
          <Route path='/' exact component={List} />
          <Route path='/edit/:id' component={Edit} />
          <Route path='/create' component={Create} />
          <Redirect to='/' />
        </Switch>
      </Suspense>
    </Router>
  );
}
