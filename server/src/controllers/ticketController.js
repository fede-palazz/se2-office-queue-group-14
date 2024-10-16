import ticketDAO from "../daos/ticketDAO.js";

function ticketController() {
  const dao = new ticketDAO();

  this.createTicket = async (service_id) => {
    console.log(service_id);
    try {
      const ticket = await dao.createTicket(service_id);
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
