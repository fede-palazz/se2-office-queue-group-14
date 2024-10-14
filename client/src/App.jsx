import "./App.css";
import { Login } from "./components/Login/Login";
import {Container}from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from './API/API.ts'


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const u = await API.getUserInfo()
            console.log(u)
            setLoggedIn(true);
            setIsLoaded(true)
            navigate("/")
        } catch {
            setLoggedIn(false);
            setUser(null)
            setIsLoaded(true)
        }
    };

    checkAuth();
  }, []);

  const dologin = function (username , password) {
    API.login(username, password)
        .then((u) => {
            setLoggedIn(true)
            //setUser(u)
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

      <Route path="/home"> Home </Route>
      </Routes>
    </Container>
  );

    
}

export default App;
