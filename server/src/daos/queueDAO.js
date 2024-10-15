import db from "../db/db.js";
import { Queue } from "../models/Queue.js";
import { QueueNotFound } from "../errors/queueError.js";

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
   * Needs to change the ticket state to "in_progress" in the ticket table.
   * @param service_id The service ID for which to retrieve the next ticket.
   * @returns next ticket_id in the queue.
   */
  async getNextTicket(service_id) {
    const getNextTicketSql = `SELECT ticket_id FROM Queue WHERE service_id = ? ORDER BY id LIMIT 1;`;
    const updateTicketStateSql = `UPDATE Ticket SET state = 'in_progress' WHERE id = ?;`;

    try {
      const row = await new Promise((resolve, reject) => {
        db.get(getNextTicketSql, [service_id], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row);
        });
      });

      if (!row) {
        throw new QueueNotFound(`No tickets found for service ID ${service_id}`);
      }

      await new Promise((resolve, reject) => {
        db.run(updateTicketStateSql, [row.ticket_id], (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });

      return row.ticket_id;
    } catch (err) {
      throw err;
    }
  }

  

  // Other methods like removeFromQueue, getQueueLength can be added similarly.
}

export default QueueDAO;
