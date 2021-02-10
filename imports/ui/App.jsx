import React from 'react';
import { Blog } from './Blog';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LoginPage } from './LoginPage';
import { NavBar } from './NavBar';
import { HomePage } from './HomePage';
import { SigninPage } from './SigninPage';
import { CreateBlog } from './CreateBlog';
import { useTracker } from 'meteor/react-meteor-data';

export const App = () => {

  const user = useTracker(() => Meteor.user());

  return (
    <Router>
      <NavBar
        user={user}
      />
      <Switch>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/signup">
          <SigninPage />
        </Route>

        <Route path="/createBlog">
          <CreateBlog />
        </Route>

        <Route path="/">
          <HomePage />        
        </Route>
      </Switch>

    </Router>
  );
};
