import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '../helpers';
import { PrivateRoute } from '../components/PrivateRoute';
import { Main, History, News, Settings, Page404 } from './index';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function App() {
  let user = useSelector(state => state.user);
  return (
    <>
      <Router history={history}>
        <div style={{ margin: '0 20px', display:'flex', flexDirection: 'column', minHeight:'87vh'}}>
          {user.token ? <Navbar /> : ''}
          <div style={{ flex: '1'}}>
            <Switch>
              <Route exact path="/" component={Main} />
              <PrivateRoute path="/news/:id" component={News} />
              <PrivateRoute path="/history" component={History} />
              <PrivateRoute path="/settings" component={Settings} />
              <PrivateRoute path="/404" component={Page404} />
              <Redirect to="/404" />
              {/* <Redirect from="*" to="/" /> */}
            </Switch>
          </div>

          <Footer />
        </div>
      </Router>
    </>);
}

export default App;
