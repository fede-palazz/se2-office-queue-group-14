class Queue {
    /**
     * Constructor for the Queue class
     * @param {number} queue_id - The unique id of the queue
     * @param {number} service_id - The id of the service of the queue
     * @param {number} ticket_id - The id of the ticket in the queue
     */
    constructor(queue_id, service_id, ticket_id) {
        this.queueId = queue_id;
        this.service_id = service_id;
        this.ticket_id = ticket_id;
    }
}

export { Queue };