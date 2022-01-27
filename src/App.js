import React, { useState } from 'react';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import GoogleLogin from 'react-google-login';

const initialUsers = [
  {username: "admin", password: "admin123"}, 
  {username: "jake", password: "jake123"}, 
  {username: "bob", password: "bob123"}, 
  {username: "test", password: "test123"}
];

function App() {
  // register or login boolean variable
  const [register, setRegister] = useState(false);
  // list of registered users
  const [users, setUsers] = useState(initialUsers)
  // currently logged in user
  const [user, setUser] = useState({username: "", password: ""})
  const [error, setError] = useState("")

  const Login = details => {
    console.log(details);
    // Looping through valid users
    for (let i = 0; i < users.length; i++) {
      if (details.username === users[i].username && details.password === users[i].password) {
        console.log("logged in.");
        setUser({
          username: details.username, 
          password: details.password
        });
        setError("");
        break;
      } else {
        continue;
      }
    }
    if (user.username === "" && user.password === "") {
      console.log("details do not match");
      setError("Invalid username or password. Please try again");
    }
  }

  const Logout = () => {
    console.log("Logout");
    setError("");
    setUser({username: "", password: ""});
    console.log(user)
  }

  const handleRegister = () => {
    setRegister(!register)
    setError("");
  }

  const Register = (details) => {
    console.log("registering new user");
    console.log(details)
    if (details.username.length > 0 && details.password.length >= 4) {
      const newList = users.concat({username: details.username, password: details.password});
      setUsers(newList);
      console.log("added user to registered users list")
      console.log("logged in");
      setUser({
        username: details.username, 
        password: details.password
      });
      setError("");
    } else {
      console.log("invalid register details");
      setError("Please use a valid username and a password more than 3 characters.");
    }
  }

  const responseGoogle = (response) => {
    console.log(response)
    setUser({username: response.profileObj.name, password: ""})
  }

  return (
    <div className="App">
      {(user.username !== "") ? (
        <div className='welcome'>
          <h2>Welcome, <span>{user.username}</span></h2>
          <h3>Do you like.... hololive?</h3>
          <button onClick={Logout}>Logout</button>
        </div>  
      ) : (
        <div className='loginForms'>
          {((!register) ? (
            <LoginForm Login={Login} error={error} handleRegister={handleRegister}/>
          ) : (<RegisterForm Register={Register} error={error} handleRegister={handleRegister}/>))}
          <GoogleLogin
            clientId="354651288125-9hejnqlt9fpd2vt1bq1a0ofcs7ujn6nf.apps.googleusercontent.com"
            buttonText="Log in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      )}
      
      {console.log(register)}
    </div>
  );
}

export default App;
