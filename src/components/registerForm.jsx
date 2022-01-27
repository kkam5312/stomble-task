import React, { useState } from 'react';

function RegisterForm({ Register, error, handleRegister }) {
    const [details, setDetails] = useState({username:"", password:""});

    const submitHandler = e => {
        e.preventDefault();

        Register(details)
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Register</h2>
                {(error != "") ? (<div className='error'>{error}</div>) : ""}
                <div className="form-group">
                    <label htmlFor="username">Enter a username:</label>
                    <input type="text" name="username" id="username" onChange={e => setDetails({...details, username: e.target.value})} value={details.username} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Enter a password:</label>
                    <input type="text" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
                </div>
            </div>
            <input type="submit" value="Register" />
            <input type="button" onClick={handleRegister} value="Back" />
        </form>
    )
}

export default RegisterForm