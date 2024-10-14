import ticketDAO from "../daos/ticketDao.js";

function ticketController() {
  const dao = new ticketDAO();

  this.createTicket = async (ticket_code, service_id) => {
    console.log("Debug: ticketData: ", ticketData);
    try {
      const ticket = await dao.createTicket(ticket_code, service_id);
      return ticket;
    } catch (error) {
      throw error;
    }
  };

  this.getTicketById = async (ticketId) => {
    try {
      const ticket = await dao.getTicketById(ticketId);
      return ticket;
    } catch (error) {
      throw error;
    }
  };

  // .changeTicketStatus(req.params.id, "getting_served")
  this.changeTicketStatus = async (ticketId, status) => {
    try {
      const ticket = await dao.changeTicketStatus(ticketId, status);
      return ticket;
    } catch (error) {
      throw error;
    }
  };
}

export default ticketController;
