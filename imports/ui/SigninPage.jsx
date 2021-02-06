import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link, useHistory } from 'react-router-dom';


export const SigninPage = () => {

    const [status, setStatus] = useState({
        email: '',
        username: '',
        password: ''
    });
    const history = useHistory();
    const [errorLabel, setErrorLabel] = useState('');

    const submit = (e) => {
        e.preventDefault();

        Meteor.call('userExists', status.username, status.email, (err, result) => {
            if (err) {
                if (err.error === 'userExits.username') {
                    setErrorLabel(`${status.username} is aldready taken`)
                }
                if (err.error === 'userExits.email') {
                    setErrorLabel(`${status.email} is aldready taken`)
                }

            } else {

                Accounts.createUser({
                    email: status.email,
                    username: status.username,
                    password: status.password
                });

                history.push('/login');

            }
        });              
    }

    const handelChange = e => {
        setStatus({...status, [e.target.name]: e.target.value});
    }
    
    return (
        <div className="login-form">
            <form onSubmit={submit}>
                <h1>Signup</h1>
                <input
                    name="email"
                    placeholder="E-mail"
                    onChange={handelChange}
                >
                </input> <br />

                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={handelChange}
                >                 
                </input><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handelChange}
                    >
                </input> <br />
                <label className="errorLabel" style={{color: "red"}}>{errorLabel}</label> <br />
                <button>Signup</button> <br />
            </form>
            <label>Already have an account? </label>
        </div>
    );
}