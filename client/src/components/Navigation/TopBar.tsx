import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function TopBar(props) {
  return (
    <Container
      fluid
      className="d-flex justify-content-between align-items-center bg-dark"
      style={{ minHeight: "80px" }}
    >
      {props.user && <span className="text-light fs-4">Welcome {props.user.name}</span>}
      {!props.user && (
        <Link to={"/"} className="text-light fs-4">
          Welcome to the Post Office
        </Link>
      )}
      {props.user && (
        <button className="btn btn-danger mt-0" onClick={props.doLogout}>
          Logout
        </button>
      )}
      {!props.user && (
        <Link to={"/login"}>
          <button className="btn btn-info mt-0">Login</button>
        </Link>
      )}
    </Container>
  );
}

export default TopBar;
