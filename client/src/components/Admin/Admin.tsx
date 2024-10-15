import React from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

function Admin() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Configure counters</h1>
      </header>
      <div className="counter-grid">
        <Counter title="Counter 1" services={["send/receive package"]} />
        <Counter title="Counter 2" services={["send/receive letter"]} />
        <Counter
          title="Counter 3"
          services={["send/receive package", "send/receive letter"]}
        />
        <Counter title="Counter 4" services={["bill payment"]} />
      </div>
    </div>
  );
}

function Counter({ title, services }) {
  const navigate = useNavigate();

  const handleEditServices = () => {
    navigate("/edit-services", { state: { title, services } });
  };

  return (
    <div className="counter-card">
      <h2>{title}</h2>
      <p>Offered services:</p>
      <ul>
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      <button className="edit-services-btn" onClick={handleEditServices}>
        Edit services
      </button>
    </div>
  );
}

export default Admin;
