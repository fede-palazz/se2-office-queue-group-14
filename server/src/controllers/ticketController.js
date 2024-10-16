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


  this.changeTicketStatus = async (ticketId, status) => {
    try {
      const ticket = await dao.changeTicketStatus(ticketId, status);
      return ticket;
    } catch (error) {
      throw error;
    }
  };

  // getTicketsInProgress()
  this.getTicketsInProgress = async () => {
    try {
      const tickets = await dao.getTicketsInProgress();
      return tickets;
    } catch (error) {
      throw error;
    }
  };

  //Update counter_id
  this.updateCounterId = async (ticketId, counter_id) => {
    try {
      const success = await dao.updateCounterId(ticketId, counter_id);
      return success;
    } catch (error) {
      throw error;
    }
  };

  // Get estimated time for a ticket
  this.getEstimatedWaitTime = async (ticketId) => {
    try {
      const time = await dao.getEstimatedWaitTime(ticketId);
      return time;
    } catch (error) {
      throw error;
    }
  };
  
}

export default ticketController;
