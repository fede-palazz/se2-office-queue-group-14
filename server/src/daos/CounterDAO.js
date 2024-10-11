import db from "../db/db.js";
import { Counter } from "../models/Counter.mjs";
import { CounterNotFound } from "../errors/counterError.mjs";

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

  // Other methods like updateCounter, deleteCounter can be added similarly.
}

export default CounterDAO;
