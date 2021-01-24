import React from 'react';

import Login from './components/pages/Login/Login.controller';

import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import PrivateRoute from './common/hocs/PrivateRoute';
import UnPrivateRoute from './common/hocs/UnPrivateRoute';

import './App.scss';
import Info from './components/pages/Info/Info';
import NotFoundPage from './components/pages/notFoundPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <PrivateRoute exact path="/info" component={Info} />
          <UnPrivateRoute path="/login" component={Login} />
          <Redirect exact from="/" to="/info" />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
