import React from 'react';

export const SigninPage = () => {
    
    return (
        <div className="login-form">
            <form>
                <h1>Signup</h1>
                <input
                    type="text"
                    name="firstName"
                    placeholder="first name"
                > 
                </input> <br />
                <input
                    type="text"
                    name="lastName"
                    placeholder="last name"
                > 
                </input><br />
                <input
                    
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
                <button>Signup</button> <br />
            </form>
            <label>Already have an account? </label>
        </div>
    );
}