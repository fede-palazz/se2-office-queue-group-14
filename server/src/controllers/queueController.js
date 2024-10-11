import QueueDAO from "../daos/QueueDAO.js";

/**
 * Represents a controller for managing queues.
 * All methods of this class must interact with the corresponding DAO class to retrieve or store data.
 */
class QueueController {
  constructor() {
    this.dao = new QueueDAO();
  }

  /**
   * Adds a new entry to the queue.
   * @param queue_id - The unique ID of the queue entry.
   * @param service_id - The ID of the service for which the queue is being managed.
   * @param ticket_id - The ID of the ticket in the queue.
   * @returns A Promise that resolves to true if the queue entry has been added.
   */
  async addToQueue(queue_id, service_id, ticket_id) {
    return this.dao.addToQueue(queue_id, service_id, ticket_id);
  }

  /**
   * Retrieves the next ticket in the queue for a specific service.
   * @param service_id - The ID of the service for which to retrieve the next ticket.
   * @returns A Promise that resolves to the next ticket object in the queue.
   */
  async getNextTicket(service_id) {
    return this.dao.getNextTicket(service_id);
  }

  // Additional methods like removeFromQueue, getQueueLength, clearQueue can be added similarly
}

export default QueueController;
