import React from 'react';
import { Link } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';

export const NavBar = () => {
    const user = useTracker(() => Meteor.user());
    const welcomeMsg = user ? `Logged in as ${user.username}` : '';

    return (
        <nav className="nav">
            <h2>{welcomeMsg}</h2>
            <Link to="/">
                <button>Home page</button>
            </Link>
            {user ? (
            <button onClick={() => Meteor.logout()}>Logout</button>
            )
            : ( <>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>Sign in</button>
            </Link></>
            )}
        </nav>
    );
}