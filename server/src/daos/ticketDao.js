import db from "../db/db.js";
import Ticket from "../models/Ticket.js";

function ticketDao() {
    this.db = db;
  
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
    
    this.generateTicket = async (ticketData) => {
     try {
          const newTicket = {
                ...ticketData,
                issue_time: new Date(),
          };
    
          const result = await this.db.insertTicket(newTicket);
          newTicket.ticket_id = result.insertId; // Assuming `insertId` contains the auto-incremented ID
          return new Ticket(newTicket);
     } catch (error) {
          throw error;
     }
    }

    //Read a ticket, (Get by ticket_id)
    this.getTicketById = async (ticketId) => {
        try {
            const ticket = await this.db.getTicketById(ticketId);
            if (!ticket) {
                throw new Error("Ticket not found");
            }
            return new Ticket(ticket);
        } catch (error) {
            throw error;
        }
    }

  }

    export default ticketDao;