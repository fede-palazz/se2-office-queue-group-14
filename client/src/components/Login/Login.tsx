import React, { useState } from "react";
import { Card, Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

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
    <Container fluid className="h-100 p-5">
      <Row>
        <Col>
          <Card className="mx-auto px-3 py-2" style={{ maxWidth: "500px" }}>
            <Card.Body className="">
              <Card.Title className="">Login</Card.Title>
              {/* <Card.Text> */}
              <Form onSubmit={handleSubmit} data-bs-theme="light">
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
              {/* </Card.Text> */}
              {props.message && <Alert variant="danger">{props.message}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export { Login };
