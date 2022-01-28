import React, { useState} from 'react';
import GoogleLogin from 'react-google-login';

function LoginForm({ Login, error, handleRegister, responseGoogle }) {
    const [details, setDetails] = useState({username:"", password:""});

    const submitHandler = e => {
        e.preventDefault();

        Login(details)
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Login</h2>
                {(error != "") ? (<div className='error'>{error}</div>) : ""}
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" onChange={e => setDetails({...details, username: e.target.value})} value={details.username} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="text" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
                </div>
            <input type="submit" value="Login" />
            <input type="button" onClick={handleRegister} value="Register an account" />
            <GoogleLogin
                clientId="354651288125-9hejnqlt9fpd2vt1bq1a0ofcs7ujn6nf.apps.googleusercontent.com"
                buttonText="Log in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            </div>
            
        </form>
    )
}

export default LoginForm