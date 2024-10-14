import "./App.css";
import { Login } from "./components/Login/Login";
import {Button, Container}from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from './API/API.ts'

import { ROLES, User, UserContext } from './components/Login/UserContext';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState(undefined)
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
        try {
            if(user === undefined) { throw new Error("User not found") }
            const u = await API.getUserInfo()
            console.log(u)
            setUser(new User(u.username, u.name, u.email, u.role))
            setLoggedIn(true);
            setIsLoaded(true)
        } catch {
            setLoggedIn(false);
            setUser(undefined)
            setIsLoaded(true)
        }
    };

    checkAuth();
  }, [navigate]);

  const dologin = function (username , password) {
    API.login(username, password)
        .then((u) => {
            setLoggedIn(true)
            setUser(new User(u.username, u.name, u.email, u.role))
            setIsLoaded(true)
            navigate('/')
        })
        .catch(err => {
            console.log(typeof err)
            setLoginMessage(err.error ? err.error : err.message ? err.message : typeof err === 'string' ? err : "An error occurred");
        })
  }

  return (
    <Container fluid style={{padding: 0}}>
      <Routes>
        <Route path="/login" element={<Login login = {dologin}
         message={loginMessage} setMessage={setLoginMessage}/>} />
      
      <Route path="/"
          element={loggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />
      <Route path="/home" element={ loggedIn ?
               <>
                <h1>Welcome, {user?.username}</h1>
                <p>Role: {user?.role}</p>
                <Button onClick={() => {
                    API.logOut().then(() => {
                        setLoggedIn(false);
                        setUser(undefined)
                        navigate('/login')
                    })
                }}>Logout</Button>
               </> 
                : <Navigate to="/login" />}
        />  
      </Routes>
    </Container>
  );

    
}

export default App;
