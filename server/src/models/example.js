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

//SERVICE MODEL
class Service {
  constructor(serviceId, serviceName, avgServiceTime) {
    this.serviceId = serviceId; // Unique identifier for the service
    this.serviceName = serviceName; // Name of the service
    this.avgServiceTime = avgServiceTime; // Average time for the service (in minutes)
  }

  // Additional methods can be added as needed
}

//COUNTER MODEL
class Counter {
  constructor(counterId, counterName) {
    this.counterId = counterId; // Unique identifier for the counter
    this.counterName = counterName; // Name of the counter (e.g., "Counter 1")
  }

  // Additional methods can be added as needed
}

//QUEUE MODEL
class Queue {
  constructor(queueId, serviceId, ticketId) {
    this.queueId = queueId; // Unique identifier for the queue entry
    this.serviceId = serviceId; // Foreign Key to Service
    this.ticketId = ticketId; // Foreign Key to Ticket
  }

  // Additional methods can be added as needed
}


//USER MODEL
//class User {
  constructor(userId, name, email, password, salt, role) {
    this.userId = userId; // Unique identifier for the user (manager)
    this.name = name; // User's name
    this.email = email; // User's email
    this.password = password; // Hashed password
    this.salt = salt; // Salt for the hashed password
    this.role = role; // Role of the user (e.g., "Manager", "Clerk")
  }

  // Method to validate the user password
  validatePassword(inputPassword, inputSalt) {
    // Implement password validation logic here (hashing and comparison)
  }

  // Additional methods can be added as needed
}

