import React from "react";
import "./App.css";
import { Login } from "./components/Login/Login.tsx";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "./API/API.ts";
import Admin from "./components/Admin/Admin.tsx";
import { EditServices } from "./components/Admin/EditServices.tsx";
import { CounterOfficer } from "./components/CounterOfficer/CounterOfficer.tsx";

import "bootstrap/dist/css/bootstrap.css";
import { ROLES, User, UserContext } from "./components/Login/UserContext.tsx";
import Home from "./components/Customer/Home.tsx";
import TopBar from "./components/Navigation/TopBar.tsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const u = await API.getUserInfo();
        setUser(new User(u.username, u.name, u.email, u.role));
        setLoggedIn(true);
        navigate("/");
      } catch {
        setLoggedIn(false);
        setUser(undefined);
      }
    };

    checkAuth();
  }, []);

  const dologin = (username, password) => {
    API.login(username, password)
      .then((u) => {
        setLoggedIn(true);
        const user = new User(u.username, u.name, u.email, u.role);
        setUser(user);
        redirect(user);
      })
      .catch((err) => {
        console.log(err);
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

  const doLogout = () => {
    API.logOut().then(() => {
      setLoggedIn(false);
      setUser(undefined);
      navigate("/login");
    });
  };

  const redirect = (user: User) => {
    switch (user?.role) {
      case ROLES.ADMIN:
        navigate("/admin");
        break;
      case ROLES.OFFICER:
        navigate("/officer");
        break;
      default:
        navigate("/home");
    }
  };

  return (
    <Container fluid style={{ padding: "0", height: "100%" }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopBar doLogout={doLogout} />
              <Home />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <TopBar doLogout={doLogout} />
              <Home />
            </>
          }
        />
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
          path="/admin"
          element={
            loggedIn && user!.role === ROLES.ADMIN ? (
              <>
                <TopBar user={user} doLogout={doLogout} />
                <Admin />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/edit-services" element={<EditServices />} />
        <Route path="/counter-officer" element={<CounterOfficer />} />
      </Routes>
    </Container>
  );
}

export default App;
