import db from "../db/db.js";
import { Counter } from "../models/Counter.js";
import { CounterNotFound } from "../errors/counterError.js";

class CounterDAO {
  /**
   * Creates a new counter and saves it in the database.
   * @param counter_name The name of the counter.
   * @returns A Promise that resolves to the created counter_id if the counter has been created.
   */
  createCounter(counter_name) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO Counter(counter_name) 
                   VALUES(?);`;
      db.run(sql, [counter_name], function (err) {
        if (err) {
          reject(err);
          return;
        }
        // Resolving with the last inserted counter_id
        resolve(this.lastID);
      });
    });
  }

  /**
   * Retrieves a counter by its ID.
   * @param counter_id The ID of the counter to retrieve.
   * @returns A Promise that resolves to the counter object if found.
   */
  getCounterById(counter_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM Counter WHERE counter_id = ?;`;
      db.get(sql, [counter_id], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (!row) {
          reject(new CounterNotFound());
          return;
        }
        resolve(new Counter(row.counter_id, row.counter_name));
      });
    });
  }

  //assign service to counter
  assignServiceToCounter(counter_id, service_id) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO CounterService(counter_id, service_id) 
                   VALUES(?, ?);`;
      db.run(sql, [counter_id, service_id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }

  //update counter name
  updateCounterName(counter_id, counter_name) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Counter SET counter_name = ? WHERE counter_id = ?;`;
      db.run(sql, [counter_name, counter_id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }

  //delete counter
  deleteCounter(counter_id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM Counter WHERE counter_id = ?;`;
      db.run(sql, [counter_id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }

  //delete service from counter
  deleteServiceFromCounter(counter_id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM CounterService WHERE counter_id = ?;`;
      db.run(sql, [counter_id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      }); 
    });
  }

  //get all services assigned to a counter
  getServicesAssignedToCounter(counter_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT service_id FROM CounterService WHERE counter_id = ?;`;
      db.all(sql, [counter_id], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows.map((row) => row.service_id));
      });
    });
  }

  //get total number of counters
  getTotalCounters() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT COUNT(*) AS total FROM Counter;`;
      db.get(sql, (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row.total);
      });
    });
  }

  //delete all services from counter
  deleteAllServicesFromCounter(counter_id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM CounterService WHERE counter_id = ?;`;
      db.run(sql, [counter_id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }
  

    

  // Other methods like updateCounter, deleteCounter can be added similarly.
}

export default CounterDAO;
