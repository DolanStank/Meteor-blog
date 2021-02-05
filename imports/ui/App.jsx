import React from 'react';
import { Blog } from './Blog';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LoginPage } from './LoginPage';
import { NavBar } from './NavBar';
import { HomePage } from './HomePage';
import { SigninPage } from './SigninPage';

export const App = () => (
  <Router>
    <NavBar />
    <Switch>

      <Route path="/login">
        <LoginPage />
      </Route>

      <Route path="/signup">
        <SigninPage />
      </Route>

      <Route path="/">
        <HomePage />        
      </Route>
    </Switch>

  </Router>
);
