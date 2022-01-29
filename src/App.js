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

  /**
   * Basic login function
   * @param {*} details 
   * If the user is valid, this function will set the current user and they will proceed to the welcome page.
   */
  const Login = details => {
    // Looping through valid users
    for (let i = 0; i < users.length; i++) {
      if (details.username === users[i].username && details.password === users[i].password) {
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
      setError("Invalid username or password. Please try again");
    }
  }

  /*
  * Basic logout function
  * Resets the current user to an empty user. Also resets the error message. 
  */
  const Logout = () => {;
    setError("");
    setUser({username: "", password: ""});
  }
  /**
   * Allows the interface to switch between the register and login screens by manipulating the {register} boolean constant. 
   */
  const handleRegister = () => {
    setRegister(!register)
    setError("");
  }
  /**
   * Basic register function
   * @param {*} details 
   * Will check whether the username and password entered is valid (non-empty and contains more than 3 characters for the password)
   * If valid, inserts the new user into the users list. 
   */
  const Register = (details) => {
    if (details.username.length > 0 && details.password.length >= 4) {
      const newList = users.concat({username: details.username, password: details.password});
      setUsers(newList);
      setUser({
        username: details.username, 
        password: details.password
      });
      setError("");
    } else {
      setError("Please use a valid username and a password more than 3 characters.");
    }
  }
  /**
   * Handler for the google login button
   * @param {*} response 
   * Will log the user in using the information provided from the google account used. 
   */
  const responseGoogle = (response) => {
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
            <LoginForm responseGoogle={responseGoogle} Login={Login} error={error} handleRegister={handleRegister}/>
          ) : (<RegisterForm responseGoogle={responseGoogle} Register={Register} error={error} handleRegister={handleRegister}/>))}
        </div>
      )}
    </div>
  );
}

export default App;
