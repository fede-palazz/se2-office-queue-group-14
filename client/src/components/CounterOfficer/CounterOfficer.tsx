import React, { useState } from "react";
import "./CounterOfficer.css";

export function QueueComponent({ onBackToService }) {
  return (
    <div className="queue">
      <h1>Counter 1</h1>
      <div className="queue-container">
        <div className="queue-card">
          <h2>Queue</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>First</th>
                <th>Last</th>
                <th>Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="buttons"
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button onClick={onBackToService}>Back</button>
      </div>
    </div>
  );
}

export function ServiceComponent({ onShowQueue }) {
  return (
    <div className="service">
      <h1>Counter 1</h1>
      <div className="service-container">
        <table>
          <thead>
            <tr>
              <th>Ticket number</th>
              <th>Service type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Service 1: Send or receive a package</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Service 2: Send or receive a letter</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Service 3: Bill payment</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button className="buttons" onClick={onShowQueue}>
            Show the queue
          </button>
          <button className="buttons">Next client</button>
        </div>
      </div>
      <p>The number of clients in line for this service is: 12</p>
    </div>
  );
}

export function CounterOfficer() {
  const [showQueue, setShowQueue] = useState(false);

  return (
    <div className="App">
      {showQueue ? (
        <QueueComponent onBackToService={() => setShowQueue(false)} />
      ) : (
        <ServiceComponent onShowQueue={() => setShowQueue(true)} />
      )}
    </div>
  );
}
