import React from 'react';

import Login from './components/pages/Login/Login.controller';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './common/hocs/PrivateRoute';
import UnPrivateRoute from './common/hocs/UnPrivateRoute';

import './App.scss';
import Test from './components/pages/Test';
import NotFoundPage from './components/pages/notFoundPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Test} />
          <UnPrivateRoute path="/login" component={Login} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
