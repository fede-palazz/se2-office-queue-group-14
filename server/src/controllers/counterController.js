import CounterDAO from "../daos/counterDAO.js";
import ServiceDAO from "../daos/serviceDAO.js";
/**
 * Represents a controller for managing counters.
 * All methods of this class must interact with the corresponding DAO class to retrieve or store data.
 */
class CounterController {
  constructor() {
    this.dao = new CounterDAO();
    this.serviceDao = new ServiceDAO();
  }

  /**
   * Creates a new counter.
   * @param counter_id - The unique ID of the counter.
   * @param counter_name - The name of the counter. Must not be null.
   * @returns A Promise that resolves to true if the counter has been created.
   */
  async createCounter(counter_id, counter_name) {
    return this.dao.createCounter(counter_id, counter_name);
  }

  /**
   * Retrieves all counters and the related services.
   * @returns A Promise that resolves to an array of counters objects.
   */
  async getAllCountersServices() {
    return this.dao.getAllCountersServices();
  }

  /**
   * Retrieves a counter by its ID.
   * @param counter_id - The unique ID of the counter to retrieve.
   * @returns A Promise that resolves to the counter object if found.
   */
  async getCounterById(counter_id) {
    return this.dao.getCounterById(counter_id);
  }

  //assign service to counter
  async assignServiceToCounter(counter_id, service_id) {
    return this.dao.assignServiceToCounter(counter_id, service_id);
  }
  //update counter name
  async updateCounterName(counter_id, counter_name) {
    return this.dao.updateCounterName(counter_id, counter_name);
  }

  //delete counter
  async deleteCounter(counter_id) {
    return this.dao.deleteCounter(counter_id);
  }

  //delete service from counter
  async deleteServiceFromCounter(counter_id) {
    return this.dao.deleteServiceFromCounter(counter_id);
  }

  //get all services assigned to a counter
  async getServicesAssignedToCounter(counter_id) {
    return this.dao.getServicesAssignedToCounter(counter_id);
  }

  //get total number of counters
  async getTotalCounters() {
    return this.dao.getTotalCounters();
  }

  //delete all services from counter
  async deleteAllServicesFromCounter(counter_id) {
    return this.dao.deleteAllServicesFromCounter(counter_id);
  }

  // Additional methods like updateCounter, deleteCounter, getAllCounters can be added similarly

  /**
   * Retrieves all counters.
   * @returns A Promise that resolves to an array of counter objects.
   */
  async getAllCounters() {
    return this.dao.getAllCounters();
  }

  /**
   * Retrieves all services assigned to a counter.
   * @param counter_id The unique ID of the counter.
   * @returns A Promise that resolves to an array of service objects.
   */
  async getConfiguredServices(counter_id) {
    return this.dao.getConfiguredServices(counter_id);
  }

  /**
   * Adds the given services to the given counter, by first deleting all existing services
   * assigned to the counter, and then adding the given services to the counter.
   * @param counter_id The unique ID of the counter.
   * @param services An array of service IDs to be added to the counter.
   * @returns A Promise that resolves to true if the services have been successfully added.
   */
  async addServicesToCounter(counter_id, services) {
    await this.dao.checkCounterExists(counter_id);
    for (const service of services) {
      await this.serviceDao.checkServiceExists(service);
    }
    await this.dao.deleteAllServicesFromCounter(counter_id);
    for (const service of services) {
      await this.dao.assignServiceToCounter(counter_id, service);
    }
    return;
  }
}

export default CounterController;
