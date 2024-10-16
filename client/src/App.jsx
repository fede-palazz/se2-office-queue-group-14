import "./App.css";
import { Login } from "./components/Login/Login";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "./API/API.ts";
import Admin from "./components/Admin/Admin.tsx";
import { EditServices } from "./components/Admin/EditServices.tsx";
import { CounterOfficer } from "./components/CounterOfficer/CounterOfficer.tsx";

import "bootstrap/dist/css/bootstrap.css";

import { ROLES, User, UserContext } from "./components/Login/UserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const u = await API.getUserInfo();
        setUser(new User(u.username, u.name, u.email, u.role));
        setLoggedIn(true);
        setIsLoaded(true);
        navigate("/");
      } catch {
        setLoggedIn(false);
        setUser(undefined);
        setIsLoaded(true);
      }
    };

    checkAuth();
  }, []);

  const dologin = function (username, password) {
    API.login(username, password)
      .then((u) => {
        setLoggedIn(true);
        setUser(new User(u.username, u.name, u.email, u.role));
        setIsLoaded(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(typeof err);
        setLoginMessage(
          err.error
            ? err.error
            : err.message
            ? err.message
            : typeof err === "string"
            ? err
            : "An error occurred"
        );
      });
  };

  const doLogout = function () {
    API.logOut().then(() => {
      setLoggedIn(false);
      setUser(undefined);
      navigate("/login");
    });
  };

  const redirect = function () {
    if (user.role.toLowerCase() === ROLES.MANAGER) {
      navigate("/manager");
    } else {
      navigate("/home");
    }
  };

  return (
    <Container fluid style={{ padding: "0", height: "100%" }}>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              login={dologin}
              message={loginMessage}
              setMessage={setLoginMessage}
            />
          }
        />

        <Route
          path="/"
          element={
            loggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />

        <Route path="/admin" element={<Admin />} />
        <Route path="/edit-services" element={<EditServices />} />
        <Route path="/counter-officer" element={<CounterOfficer />} />

        <Route
          path="/home"
          element={
            loggedIn && (
              <div className="d-flex justify-content-between align-items-center p-3 bg-light">
                <div>
                  Welcome, {user.name} ({user.role})
                </div>
                <button className="btn" onClick={redirect}>
                  Go to my page
                </button>
                <button className="btn btn-danger" onClick={doLogout}>
                  Logout
                </button>
              </div>
            )
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
