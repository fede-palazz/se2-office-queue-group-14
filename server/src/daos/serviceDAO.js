import db from "../db/db.js";
import { Service } from "../models/Service.js";
import { ServiceNotFound } from "../errors/serviceError.js";

class ServiceDAO {
  /**
   * Creates a new service and saves it in the database.
   * @param service_name The name of the service.
   * @param avg_service_time The average time needed to process the service.
   * @returns A Promise that resolves to the created service_id if the service has been created.
   */
  createService(service_name, avg_service_time) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO Service(service_name, avg_service_time) 
                   VALUES(?,?);`;
      db.run(sql, [service_name, avg_service_time], function (err) {
        if (err) {
          reject(err);
          return;
        }
        // Resolving with the last inserted service_id
        resolve(this.lastID);
      });
    });
  }

  /**
   * Retrieves a service by its ID.
   * @param service_id The ID of the service to retrieve.
   * @returns A Promise that resolves to the service object if found.
   */
  getServiceById(service_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM Service WHERE service_id = ?;`;
      db.get(sql, [service_id], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (!row) {
          reject(new ServiceNotFound());
          return;
        }
        resolve(new Service(row.service_id, row.service_name, row.avg_service_time));
      });
    });
  }

  //add service time to update the average service time
  addServiceTime(service_id, service_time) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Service SET avg_service_time = (avg_service_time + ?) WHERE service_id = ?;`;
      db.run(sql, [service_time, service_id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }

  // Update service name
  updateServiceName(service_id, service_name) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Service SET service_name = ? WHERE service_id = ?;`;
      db.run(sql, [service_name, service_id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }

  // Update service average time
  updateServiceAvgTime(service_id, avg_service_time) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Service SET avg_service_time = ? WHERE service_id = ?;`;
      db.run(sql, [avg_service_time, service_id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }

  // Delete service
  deleteService(service_id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM Service WHERE service_id = ?;`;
      db.run(sql, [service_id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }

  // Get all counters assigned to a service
  getCountersAssignedToService(service_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT counter_id FROM CounterService WHERE service_id = ?;`;
      db.all(sql, [service_id], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows.map((row) => row.counter_id));
      });
    });
  }

  // Get all services
  getAllServices() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM Service;`;
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows.map((row) => new Service(row.service_id, row.service_name, row.avg_service_time)));
      });
    });
  }

  // Other methods like updateService, deleteService can be added similarly.
}

export default ServiceDAO;
