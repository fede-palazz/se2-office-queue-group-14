import db from "../db/db.js";
import Ticket from "../models/Ticket.js";

function ticketDao() {
    this.db = db;
    this.Ticket = Ticket;
  
   /**
    * Generate a new ticket and add it to the database.
    * @param {*} ticket_code 
    * @param {*} service_id 
    * @returns A Promise that resolves to the newly created ticket object.
    */
    
    this.createTicket = async (ticket_code, service_id) => {
     try {
          const newTicket = {
                ticket_code: ticket_code,
                service_id: service_id,
                ticket_status: "waiting",
                issue_time: new Date(),
          };
          const sql = `INSERT INTO ticket (ticket_code, service_id, ticket_status, issue_time) VALUES (?, ?, ?, ?)`;
          const result = await this.db.run(sql, [ticketData.issue_time, ticketData.user_id, ticketData.ticket_status, ticketData.ticket_type]);
          newTicket.ticket_id = result.insertId; // Assuming `insertId` contains the auto-incremented ID
          return new Ticket(newTicket);
     } catch (error) {
          console.log("Debug: error: ", error);
          throw error;
     }
    }

   /**
    * Get a ticket by its ID.
    * @param {*} ticketId 
    * @returns A Promise that resolves to the ticket object if found.
    */
    this.getTicketById = async (ticketId) => {
          // Get ticket from the database, create query
          // using a Promise
          console.log("Debug: ticket_id: ", ticketId);
          return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ticket WHERE ticket_id = ?`;
            this.db.get(sql, [ticketId], (err, row) => {
              if (err) {
                reject(err);
                return;
              }
              if(row === undefined) {
                reject(new Error("Ticket not found"));
                return;
              }
              resolve(row);
            });
          });
    }

    /**
     * Change the status of a ticket.
     * @param {*} ticketId 
     * @param {*} status 
     * @returns A Promise that resolves to true if the ticket has been updated.
     */
    this.changeTicketStatus = async (ticketId, status) => {
          // Update ticket status in the database
          // using a Promise
          return new Promise((resolve, reject) => {
            const sql = `UPDATE ticket SET ticket_status = ? WHERE ticket_id = ?`;
            this.db.run(sql, [status, ticketId], (err) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(true);
            });
          });
    }

    /** Get all tickets with status "in_progress".
     * @params None.
     * @returns A Promise that resolves to an array of tickets with status "in_progress".
     */
    this.getTicketsInProgress = async () => {
          // Get tickets with status "in_progress" from the database
          // using a Promise
          return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ticket WHERE ticket_status = "in_progress"`;
            this.db.all(sql, [], (err, rows) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(rows);
            });
          });
    }

    /**  Change field counter_id to ticket with ticket_id
      * @param ticket_id - The ID of the ticket to be updated.
      * @param service_id - The ID of the service to be updated.
      * @returns A Promise that resolves to true if the ticket has been updated.
    */

    this.updateCounterId = async (ticket_id, counter_id) => {
      return new Promise((resolve, reject) => {
        const sql = `UPDATE ticket SET service_id = ? WHERE ticket_id = ?`;
        this.db.run(sql, [counter_id, ticket_id], (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(true);
        });
      });
    }

  /** Get average service time for given ticketId, given expression: 
  * AVG_Service_Time (Found in the service table) * (Number of services in the queue before the ticket)
  * @param ticket_id The ticket ID for which to calculate the estimated wait time.
  * @returns The estimated wait time for the ticket.
  */

  this.getEstimatedWaitTime = async (ticket_id) => {
    const getTicketServiceIdSql = `SELECT service_id FROM Ticket WHERE id = ?;`;
    const getQueueLengthSql = `SELECT COUNT(*) AS queue_length FROM Queue WHERE service_id = ? AND id < (SELECT id FROM Queue WHERE ticket_id = ?);`;
    const getServiceAvgTimeSql = `SELECT AVG_Service_Time FROM Service WHERE id = ?;`;

    try {
      const ticketServiceId = await new Promise((resolve, reject) => {
        db.get(getTicketServiceIdSql, [ticket_id], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row.service_id);
        });
      });
      const queueLength = await new Promise((resolve, reject) => {
        db.get(getQueueLengthSql, [ticketServiceId, ticket_id], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row.queue_length);
        });
      });
      const serviceAvgTime = await new Promise((resolve, reject) => {
        db.get(getServiceAvgTimeSql, [ticketServiceId], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row.AVG_Service_Time);
        });
      });

      return serviceAvgTime * queueLength;
    } catch (err) {
      throw err;
    }
  }


  }

    export default ticketDao;