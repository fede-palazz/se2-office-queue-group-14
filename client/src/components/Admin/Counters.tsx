import React from "react";
// import "./Admin.css";
import { Form, Card, Container, Row, Col } from "react-bootstrap";

function Counters() {
  return (
    <Container className="pt-5">
      <Row className="w-100">
        <Col md={8} className="text-center pb-3 w-100">
          <h1>Configure counters</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md className=" mb-3">
          <Card className="mx-auto" style={{ minWidth: "200px", maxWidth: "400px" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md className="">
          <Card className="mx-auto" style={{ minWidth: "200px", maxWidth: "400px" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    // <div className="App">
    //   <header className="App-header">
    //     <h1>Configure counters</h1>
    //   </header>
    //   <div className="counter-grid">
    //     <Counter title="Counter 1" services={["send/receive package"]} />
    //     <Counter title="Counter 2" services={["send/receive letter"]} />
    //     <Counter title="Counter 3" services={["send/receive package", "send/receive letter"]} />
    //     <Counter title="Counter 4" services={["bill payment"]} />
    //   </div>
    // </div>
  );
}

function Counter({ title, services }) {
  return (
    <div className="counter-card">
      <h2>{title}</h2>
      <p>Offered services:</p>
      <ul>
        {services.map((service, index) => (
          <li key={index}>{service}</li>
          // <Form.Check key={index} type={"checkbox"} label={service} id={index} />
        ))}
      </ul>
      <button className="edit-services-btn">Edit services</button>
    </div>
  );
}

export default Counters;
