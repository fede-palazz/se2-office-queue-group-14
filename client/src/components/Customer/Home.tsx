import React from "react";
import { Modal, Container, Button, Row, Col, Card } from "react-bootstrap";
import { TicketPerforated, Printer } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import API from "../../API/API";
import PropTypes from "prop-types";
import { QRCodeSVG } from "qrcode.react";

function QRCodeComponent(props) {
  return (
    <Container>
      <QRCodeSVG
        value={props.ticketCode}
        title={"Title for my QR Code"}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        marginSize={0}></QRCodeSVG>
      <h5 className="my-3">
        Ticket Code: <span className="fw-bold">{props.ticketCode}</span>
      </h5>
      <h5 className="my-3">
        Estimated waiting time:{" "}
        <span className="fw-bold">{props.ticketCode}</span>
      </h5>
    </Container>
  );
}

function TicketModal(props) {
  const { ticketCode, ...modalProps } = props;
  return (
    <Modal {...modalProps} centered>
      <Modal.Header className="text-center">
        <Modal.Title id="contained-modal-title-vcenter">
          Scan your ticket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <QRCodeComponent ticketCode={ticketCode}></QRCodeComponent>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button size="sm" onClick={modalProps.onHide} variant="dark">
          <Printer size={24} />
          <span className="m-2">Print</span>
        </Button>
        <Button variant="outline-danger" size="sm" onClick={modalProps.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ServiceList(props) {
  const [services, setServices] = useState<any>(undefined);

  useEffect(() => {
    if (services !== undefined) {
      return;
    }

    API.getServices()
      .then((response) => setServices(response))
      .catch((err) => {
        return;
        //TODO error handling
      });
  }, []);

  const handleServiceSelection = (service_id) => {
    props.setSelectedService(service_id);
  };

  return (
    <Row>
      {services &&
        services.map((service) => (
          <Col key={service.service_id}>
            <Card
              bg={
                props.selectedService == service.service_id ? "dark" : "light"
              }
              border={
                props.selectedService == service.service_id ? "light" : "dark"
              }
              key={service.service_id}
              text={
                props.selectedService == service.service_id ? "light" : "dark"
              }
              style={{ width: "18rem", cursor: "pointer" }}
              className="mb-2 text-center"
              onClick={() => handleServiceSelection(service.service_id)}>
              <Card.Header className="fw-bold fs-3">
                {service.service_name}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {service.avg_service_time} minutes of average service time{" "}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
}

function Home() {
  const [selectedService, setSelectedService] = useState<any>(undefined);
  const [modalShow, setModalShow] = useState<any>(false);
  const [ticketCode, setTicketCode] = useState<any>("");

  const handleGettingTicket = () => {
    API.createTicket(selectedService)
      .then((response) => {
        setTicketCode(response.ticket_code);
        setModalShow(true);
      })
      .catch((err) => {
        return;
        //TODO error handling
      });
  };

  return (
    <>
      <Container className="d-flex flex-column align-items-center vh-auto vw-100">
        <h1 className="my-4 p-3 text-center">Select the requested service</h1>
        <ServiceList
          selectedService={selectedService}
          setSelectedService={setSelectedService}></ServiceList>
        <Button
          variant="dark"
          disabled={selectedService === undefined}
          onClick={handleGettingTicket}>
          <TicketPerforated size={24} />
          <span className="m-2">Get Ticket</span>
        </Button>
        <TicketModal
          ticketCode={ticketCode}
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setTicketCode("");
            setSelectedService(undefined);
          }}
        />
      </Container>
    </>
  );
}

Home.propTypes = {
  getServices: PropTypes.func,
};

export default Home;
