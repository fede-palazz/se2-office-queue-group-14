import React from "react";
import { Row, Col, Container, Table } from "react-bootstrap";

export const Manager = (props: any) => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <div className="w-75">
        <div>
          <h3>Status summary</h3>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Type of service</th>
                <th>Counter number</th>
                <th>Number of served clients per counter</th>
                <th>Number of served clients per service type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Service 1 : Send or receive a package</td>
                <td>1 , 3 ,4</td>
                <td>12</td>
                <td>12</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Service 2 : Send or receive a letter</td>
                <td>2, 4</td>
                <td>20</td>
                <td>20</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Service 3 : Bill payment</td>
                <td>1, 3</td>
                <td>15</td>
                <td>15</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
