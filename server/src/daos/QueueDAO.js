import db from "../db/db.js";
import { Queue } from "../models/Queue.js";
import { QueueNotFound } from "../errors/queueError.mjs";

class QueueDAO {
  /**
   * Adds a ticket to a service queue.
   * @param service_id The service ID to which the ticket belongs.
   * @param ticket_id The ticket ID to be added to the queue.
   * @returns A Promise that resolves to true if the ticket has been added to the queue.
   */
  addToQueue(service_id, ticket_id) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO Queue(service_id, ticket_id) 
                   VALUES(?,?);`;
      db.run(sql, [service_id, ticket_id], (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }

  /**
   * Retrieves the next ticket in the queue for a specific service.
   * @param service_id The service ID for which to retrieve the next ticket.
   * @returns A Promise that resolves to the next ticket in the queue.
   */
  getNextTicket(service_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT ticket_id FROM Queue WHERE service_id = ? ORDER BY queue_id LIMIT 1;`;
      db.get(sql, [service_id], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (!row) {
          reject(new QueueNotFound());
          return;
        }
        resolve(row.ticket_id);
      });
    });
  }

  // Other methods like removeFromQueue, getQueueLength can be added similarly.
}

export default QueueDAO;
