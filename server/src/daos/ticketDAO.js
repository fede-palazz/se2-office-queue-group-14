import db from "../db/db.js";
import Ticket from "../models/Ticket.js";
import ServiceDAO from "../daos/serviceDAO.js";

function ticketDao() {
  this.db = db;
  this.serviceDao = new ServiceDAO();

  //Generate ticket, no user id required

  this.createTicket = async (service_id) => {
    try {
      const service = await this.serviceDao.getServiceById(service_id);
      const ticket_code =
        String.fromCharCode(service_id + 64) + service.daily_index;
      const newTicket = {
        ticket_code: ticket_code,
        service_id: service_id,
        ticket_status: "waiting",
        issue_time: new Date(),
      };
      const sql = `INSERT INTO Ticket (ticket_code, service_id, status, issue_time) VALUES (?, ?, ?, ?)`;
      const result = await this.db.run(sql, [
        newTicket.ticket_code,
        newTicket.service_id,
        newTicket.ticket_status,
        newTicket.issue_time,
      ]);
      return new Ticket(
        newTicket.ticket_id,
        newTicket.ticket_code,
        newTicket.service_id,
        newTicket.issue_time,
        newTicket.ticket_status,
        0
      );
    } catch (error) {
      console.log("Debug: error: ", error);
      throw error;
    }
  };

  //Read a ticket, (Get by ticket_id)
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
        if (row === undefined) {
          reject(new Error("Ticket not found"));
          return;
        }
        resolve(row);
      });
    });
  };

  //Update ticket status changeTicketStatus(ticketId, status)
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
  };

  this.getEstimatedWaitTime = async function (service_id) {
    try {
      const service = await this.serviceDao.getServiceById(service_id);
      // Get the number of tickets in progress with the same service_id
      const ticketsInProgress = await new Promise((resolve, reject) => {
        const sql =
          "SELECT COUNT(*) as count FROM Ticket WHERE service_id = ? AND status = 'waiting' ";
        this.db.get(sql, [service_id], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row.count);
          return;
        });
      });

      // From the table Counter_Service
      const summation = await new Promise((resolve, reject) => {
        const sql = `SELECT counter_id,COUNT(*) as occurrences 
                      FROM Counter_Service 
                      WHERE counter_id IN (
                          SELECT counter_id 
                          FROM Counter_Service 
                          WHERE service_id = ?
                      )GROUP BY counter_id;`;
        this.db.all(sql, [service_id], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          let total = 0;

          for (let i = 0; i < rows.length; i++) {
            total += 1 / rows[i].occurrences;
          }
          resolve(total);
        });
      });

      // Calculate the estimated wait time
      const estimatedWaitTime =
        service.avg_service_time * (ticketsInProgress / summation + 0.5);
      return estimatedWaitTime;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export default ticketDao;
