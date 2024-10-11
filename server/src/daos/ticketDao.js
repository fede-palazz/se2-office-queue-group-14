import db from "../db/db.js";
import Ticket from "../models/Ticket.js";

function ticketDao() {
    this.db = db;
    this.Ticket = Ticket;
  
    /**
     * Example function
    this.exampleFunction = (params) => {
      return new Promise((resolve, reject) => {
        const sql = `sql`;
        this.db.run(sql, [params], (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(true);
        });
      });
    };
    */
   //Generate ticket, no user id required
    
    this.createTicket = async (ticketData) => {
     try {
          const newTicket = {
                ...ticketData,
                issue_time: new Date(),
          };
          const sql = `INSERT INTO ticket (issue_time, user_id, ticket_status, ticket_type) VALUES (?, ?, ?, ?)`;
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
              resolve(row);
            });
          });
    }

  }

    export default ticketDao;