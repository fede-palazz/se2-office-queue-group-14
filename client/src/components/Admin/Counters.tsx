import React, { useEffect, useState } from "react";
import { Form, Card, Container, Row, Col, Button } from "react-bootstrap";
import API from "../../API/API";

function Counters() {
  const [counters, setCounters] = useState<any[]>([]);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const counters = await API.getCountersServices();
        setCounters(counters);
      } catch (err) {
        setCounters([]);
        console.error(err);
      }
    };
    fetchCounters();
  }, []);

  return (
    <Container className="pt-5">
      <Row className="w-100">
        <Col md={8} className="text-center pb-3 w-100">
          <h1>Configure counters</h1>
        </Col>
      </Row>
      <Row>
        {counters &&
          counters.map((counter) => (
            <Col xs={12} md className="mb-3" key={counter.id}>
              <Card className="mx-auto" style={{ minWidth: "200px", maxWidth: "400px" }}>
                <Card.Body>
                  <Card.Title>{counter.name}</Card.Title>
                  <ul className="mb-4">
                    {counter.services.map((service) => (
                      <li key={service.id}>{service.name}</li>
                    ))}
                  </ul>
                  <Button variant="dark">Edit services</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
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
