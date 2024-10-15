import Button from "react-bootstrap/Button";
import { Form, Modal } from "react-bootstrap";
import React from "react";

export const EditServicesModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Config conter {props.index}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Select services</h4>
        <Form>
          <Form.Check
            type={"checkbox"}
            label={"Send/ receive package"}
            id={"checkbox"}
          ></Form.Check>
          <Form.Check
            type={"checkbox"}
            label={"Send/ receive letter"}
            id={"checkbox"}
          ></Form.Check>
          <Form.Check
            type={"checkbox"}
            label={"Bill payment"}
            id={"checkbox"}
          ></Form.Check>
        </Form>
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
