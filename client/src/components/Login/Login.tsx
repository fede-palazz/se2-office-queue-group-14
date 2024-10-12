import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import "./Login.css";

function Login(props: any) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let valid = true;
    let msg = "";

    if (!username || username === "") {
      valid = false;
      msg += "Please insert a valid username\n";
    }
    if (!password || password === "") {
      valid = false;
      msg += "Please insert a valid password\n";
    }
    if (valid) {
      const userExists = props.login(username, password);
      if (!userExists) {
        setShowRegister(true);
      }
    } else {
      props.setMessage(msg);
    }
  };

  const handleRegister = (event: any) => {
    event.preventDefault();
    let valid = true;
    let msg = "";

    if (!name || name === "") {
      valid = false;
      msg += "Please insert a valid name\n";
    }
    if (!username || username === "") {
      valid = false;
      msg += "Please insert a valid username\n";
    }
    if (!password || password === "") {
      valid = false;
      msg += "Please insert a valid password\n";
    }
    if (!repeatPassword || repeatPassword === "") {
      valid = false;
      msg += "Please insert a valid repeat password\n";
    }
    if (password !== repeatPassword) {
      valid = false;
      msg += "Passwords do not match\n";
    }
    if (valid) {
      props.register(name, username, password);
      setShowRegister(false);
    } else {
      props.setMessage(msg);
    }
  };

  return (
    <Container fluid className="LoginContainer">
      <Row>
        <Col>
          <h4>Login</h4>
          <Form onSubmit={handleSubmit}>
            <div className="text_area">
              <Form.Group>
                <div className="title"> Username : </div>
                <Form.Control
                  type="text"
                  placeholder="  username  "
                  onChange={(e) => setUsername(e.target.value)}
                  className="text_input"
                />
              </Form.Group>

              <Form.Group>
                <div className="title"> Password : </div>
                <Form.Control
                  type="password"
                  placeholder="  Password  "
                  onChange={(e) => setPassword(e.target.value)}
                  className="text_input"
                />
              </Form.Group>
            </div>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
        {showRegister && (
          <Col>
            <h2>Register</h2>
            <Form onSubmit={handleRegister}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repeat Password"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        )}
      </Row>
      {props.message && <Alert variant="danger">{props.message}</Alert>}
    </Container>
  );
}

export { Login };
