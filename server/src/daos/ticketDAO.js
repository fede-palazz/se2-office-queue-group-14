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
}

export default ticketDao;
