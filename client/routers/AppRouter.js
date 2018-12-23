import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import AddContactPage from '../components/AddContactPage/AddContactPage';
import ContactsListPage from '../components/ContactsListPage/ContactsListPage';
import EditContactPage from '../components/EditContactPage/EditContactPage';
import Header from '../components/Header/Header'

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header/>
      <Switch>
        <Route path="/" component={ContactsListPage} exact={true}/>
        <Route path="/add" component={AddContactPage} exact={true}/>
        <Route path="/edit/:id" component={EditContactPage} exact={true}/>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;