import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export const LoginPage = () => {

    const [status, setStatus] = useState({
        username: '',
        password: ''
    });
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        try {
            Meteor.loginWithPassword(status.username, status.password);
            history.push('/');
        } catch (err) {
            console.log(err);
        }
        
    }

    const handelChange = e => {
        setStatus({...status, [e.target.name]: e.target.value});
    }


    return (
        <div className="login-form">
            <form onSubmit={submit}>
                <h1>Login</h1>
                <input
                    name="username"
                    placeholder="username"
                    onChange={handelChange}
                    >
                </input> <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handelChange}
                    >
                </input> <br />
                <label className="errorLabel" style={{color: "red"}}>error</label> <br />
                <button>Login</button> <br />
            </form>
            <label>Don't have an account? </label>
        </div>
    );
}