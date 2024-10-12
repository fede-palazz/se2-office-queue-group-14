import ticketDAO from "../daos/ticketDAO.js";

function ticketController() {
    const dao = new ticketDAO();

    this.createTicket = async (ticketData) => {
        console.log("Debug: ticketData: ", ticketData);
        try {
            const ticket = await dao.createTicket(ticketData);
            return ticket;
        } catch (error) {
            throw error;
        }
    }

    this.getTicketById = async (ticketId) => {
        try {
            const ticket = await dao.getTicketById(ticketId);
            return ticket;
        } catch (error) {
            
            throw error;
        }
    }

}

export default ticketController;