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

  // Other methods like updateService, deleteService can be added similarly.
}

export default ServiceDAO;
