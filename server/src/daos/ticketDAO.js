import db from "../db/db.js";
import Ticket from "../models/Ticket.js";

function ticketDao() {
    this.db = db;
    this.Ticket = Ticket;
  
   //Generate ticket, no user id required
    
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
              if(row === undefined) {
                reject(new Error("Ticket not found"));
                return;
              }
              resolve(row);
            });
          });
    }

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
    }

  }

    export default ticketDao;