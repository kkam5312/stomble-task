import React, { useState } from 'react';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

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

  return (
    <div className="App">
      {(user.username !== "") ? (
        <div className='welcome'>
          <h2>Welcome, <span>{user.username}</span></h2>
          <h3>Do you like.... glee?</h3>
          <button onClick={Logout}>Logout</button>
        </div>  
      ) : (
        (!register) ? (
          <LoginForm Login={Login} error={error} handleRegister={handleRegister}/>
        ) : (<RegisterForm Register={Register} error={error} handleRegister={handleRegister}/>)
      )}
      
      {console.log(register)}
    </div>
  );
}

export default App;
