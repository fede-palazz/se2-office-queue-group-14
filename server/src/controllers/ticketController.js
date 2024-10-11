import ticketDAO from "../daos/ticketDAO.mjs";

function ticketController() {
    const dao = new ticketDAO();

    this.createTicket = async (ticketData) => {
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