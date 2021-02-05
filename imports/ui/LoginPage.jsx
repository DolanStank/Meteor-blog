import React from 'react';

export const LoginPage = () => {

    return (
        <div className="login-form">
            <form>
                <h1>Login</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    
                    >
                </input> <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
    
                    >
                </input> <br />
                <label className="errorLabel" style={{color: "red"}}>error</label> <br />
                <button>Login</button> <br />
            </form>
            <label>Don't have an account? </label>
        </div>
    );
}