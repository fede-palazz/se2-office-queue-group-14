import Button from "react-bootstrap/Button";
import { Form, Modal } from "react-bootstrap";
import React from "react";

export const AddServiceModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Service
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Insert the new service info</h4>
        <Form.Control size="sm" type="text" placeholder="service tag" />
        <Form.Control
          size="sm"
          type="text"
          placeholder="estimated service time"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Save
        </Button>
        <Button variant="outline-dark" onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
