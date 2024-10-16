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
      {props.user && <div className="text-light">Welcome {props.user.name}</div>}
      {!props.user && <div className="text-light">Welcome to the Post Office</div>}
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
