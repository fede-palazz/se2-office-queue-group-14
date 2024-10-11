class Ticket {
    /**
     * Constructor for the Ticket class
     * @param {number} ticket_id - The unique id of the ticket
     * @param {string} ticket_code - The code of the ticket
     * @param {number} service_id - The id of the service the ticket is for
     * @param {Date} issue_time - The time when the ticket was created
     * @param {string} status - The status of the ticket
     * @param {number} counter_id - The id of the counter where the ticket was taken
     */
    constructor(ticket_id, ticket_code, service_id, issue_time, status, counter_id) {
        this.ticket_id = ticket_id;
        this.ticket_code = ticket_code;
        this.service_id = service_id;
        this.issue_time = issue_time ? new Date(issue_time) : new Date();
        this.status = status;
        this.counter_id = counter_id;
    }
}

export default { Ticket };
