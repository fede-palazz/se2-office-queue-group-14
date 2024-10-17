import Button from "react-bootstrap/Button";
import { Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import API from "../../API/API";

function EditServicesModal({ counter, handleSave, handleClose }) {
  const [services, setServices] = useState<any[]>([]);
  const [selectedServices, setSelectedServices] = useState<any[]>(
    counter.services.map((service) => service.id)
  );

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const services = await API.getServices();
        setServices(services);
      } catch (err) {
        setServices([]);
        console.error(err);
      }
    };
    fetchAllServices();
  }, []);

  useEffect(() => {
    console.log(selectedServices);
  }, [selectedServices]);

  const handleCheck = (serviceId) => {
    if (selectedServices.filter((id) => id === serviceId).length === 0) {
      // Service not selected
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      // Service already selected
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    }
  };
  return (
    <Modal
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Config conter {counter.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Select services</h5>
        <Form>
          {services.map((service) => (
            <Form.Check
              key={service.service_id}
              type={"checkbox"}
              label={service.service_name}
              id={service.service_id}
              // value={selectedServices.includes(service.service_id)}
              defaultChecked={selectedServices.includes(service.service_id)}
              onClick={() => handleCheck(service.service_id)}
            ></Form.Check>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={() => handleSave(counter.id, selectedServices)}>
          Save
        </Button>
        <Button variant="outline-dark" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditServicesModal;
