/**
 * Represents an example entity
 *
 * @param {number} param1 Param 1
 */
function Example(param1) {
  this.param1 = param1;
}

export default Example;


// TICKET MODEL
class Ticket {
  constructor(ticketId, ticketCode, serviceId, issueTime, status, counterId) {
    this.ticketId = ticketId; // Unique identifier for the ticket
    this.ticketCode = ticketCode; // Unique ticket code
    this.serviceId = serviceId; // Foreign Key to Service
    this.issueTime = issueTime; // Timestamp when the ticket was issued
    this.status = status; // Status of the ticket (e.g., "Waiting", "Served")
    this.counterId = counterId; // Foreign Key to Counter
  }

  // Method to update ticket status
  updateStatus(newStatus) {
    this.status = newStatus;
  }

  // Additional methods can be added as needed
}
