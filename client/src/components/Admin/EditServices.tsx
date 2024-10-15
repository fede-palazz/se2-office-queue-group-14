import React from "react";
import ReactDOM from "react-dom";
import "./EditServices.css";
import { EditServicesModal } from "./EditServicesModal";

export const EditServices = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [counterNumber, setCounterNumber] = React.useState(null);
  const openModal = (index) => {
    setCounterNumber(index);
    setModalShow(true);
  };
  return (
    <div className="app">
      <header className="header">
        <h1>Configure counters</h1>
        <div>
          <button>Add service</button>
        </div>
      </header>
      <div className="counter-grid">
        <Counter
          setModalShow={() => openModal(1)}
          title="Counter 1"
          services={["send/receive package"]}
        />
        <Counter
          setModalShow={() => openModal(2)}
          title="Counter 2"
          services={["send/receive letter"]}
        />
        <Counter
          setModalShow={() => openModal(3)}
          title="Counter 3"
          services={["send/receive package", "send/receive letter"]}
        />
        <Counter
          setModalShow={() => openModal(4)}
          title="Counter 4"
          services={["bill payment"]}
        />
      </div>
      <EditServicesModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        index={counterNumber}
      />
    </div>
  );
};

const Counter = ({ title, services, setModalShow }) => {
  return (
    <div className="counter-card">
      <h2>{title}</h2>
      <p>Offered services:</p>
      <ul>
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      <button onClick={() => setModalShow(true)} className="edit-services-btn">
        Edit services
      </button>
    </div>
  );
};
