import React, { useEffect, useState } from "react";
import { Form, Card, Container, Row, Col, Button } from "react-bootstrap";
import API from "../../API/API";
import EditServicesModal from "./EditServicesModal";

function Counters() {
  const [counters, setCounters] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCounter, setEditCounter] = useState(null);

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

  const handleEditService = (counterId) => {
    const counter = counters.find((counter) => counter.id === counterId);
    console.log(counter);
    setEditCounter(counter);
    setShowEditModal(true);
  };

  const handleSave = (counterId, services) => {
    try {
      const response = API.updateCounterServices(counterId, services);
    } catch (err) {
      setCounters([]);
      console.error(err);
    } finally {
      setShowEditModal(false);
    }
  };

  return (
    <Container className="pt-5">
      <Row className="w-100">
        <Col md={8} className="text-center pb-3 w-100">
          <h1>Configure counters</h1>
        </Col>
      </Row>
      <Row>
        {counters.map((counter) => (
          <Counter
            counter_id={counter.id}
            counter_name={counter.name}
            services={counter.services}
            handleEdit={handleEditService}
          />
        ))}
      </Row>
      {showEditModal && (
        <EditServicesModal
          counter={editCounter}
          handleSave={handleSave}
          handleClose={() => {
            setShowEditModal(false);
            setEditCounter(null);
          }}
        />
      )}
    </Container>
  );
}

function Counter({ counter_id, counter_name, services, handleEdit }) {
  return (
    <Col xs={12} md className="mb-3" key={counter_id}>
      <Card className="mx-auto" style={{ minWidth: "200px", maxWidth: "400px" }}>
        <Card.Body>
          <Card.Title>{counter_name}</Card.Title>
          <ul className="mb-4">
            {services.map((service) => (
              <li key={service.id}>{service.name}</li>
            ))}
          </ul>
          <Button variant="dark" onClick={() => handleEdit(counter_id)}>
            Edit services
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Counters;
