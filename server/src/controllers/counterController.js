import CounterDAO from "../daos/counterDAO.js";

/**
 * Represents a controller for managing counters.
 * All methods of this class must interact with the corresponding DAO class to retrieve or store data.
 */
class CounterController {
  constructor() {
    this.dao = new CounterDAO();
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
   * Retrieves a counter by its ID.
   * @param counter_id - The unique ID of the counter to retrieve.
   * @returns A Promise that resolves to the counter object if found.
   */
  async getCounterById(counter_id) {
    return this.dao.getCounterById(counter_id);
  }

  // Additional methods like updateCounter, deleteCounter, getAllCounters can be added similarly
}

export default CounterController;
