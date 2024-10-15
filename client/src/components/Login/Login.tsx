import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import "./Login.css";

function Login(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let valid = true;
    let msg = "";

    if (!username || username === "") {
      valid = false;
      msg = "Please insert a valid username\n";
    } else if (!password || password === "") {
      valid = false;
      msg = "Please insert a valid password\n";
    } else if (password.length < 3) {
      valid = false;
      msg = "Password must be at least 3 chars long\n";
    }
    if (valid) {
      props.login(username, password);
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
                  placeholder="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <div className="title"> Password : </div>
                <Form.Control
                  type="password"
                  placeholder="password"
                  min={3}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </div>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
      {props.message && <Alert variant="danger">{props.message}</Alert>}
    </Container>
  );
}

export { Login };
