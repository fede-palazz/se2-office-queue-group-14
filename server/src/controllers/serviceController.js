import ServiceDAO from "../daos/serviceDAO.js";
/**
 * Represents a controller for managing services.
 * All methods of this class must interact with the corresponding DAO class to retrieve or store data.
 */
class ServiceController {
  constructor() {
    this.dao = new ServiceDAO();
  }

  /**
   * Creates a new service.
   * @param service_id - The unique ID of the service.
   * @param service_name - The name of the service. Must not be null.
   * @param avg_service_time - The average service time. Must not be null.
   * @returns A Promise that resolves to true if the service has been created.
   */
  async createService(service_id, service_name, avg_service_time) {
    return this.dao.createService(service_id, service_name, avg_service_time);
  }

  /**
   * Retrieves a service by its ID.
   * @param service_id - The unique ID of the service to retrieve.
   * @returns A Promise that resolves to the service object if found.
   */
  async getServiceById(service_id) {
    return this.dao.getServiceById(service_id);
  }

  //update service name
  async updateServiceName(service_id, service_name) {
    return this.dao.updateServiceName(service_id, service_name);
  }

  //update service average time
  async updateServiceAvgTime(service_id, avg_service_time) {
    return this.dao.updateServiceAvgTime(service_id, avg_service_time);
  }

  // add service time to update the average service time
  async addServiceTime(service_id, service_time) {
    return this.dao.addServiceTime(service_id, service_time);
  }

  //delete service
  async deleteService(service_id) {
    return this.dao.deleteService(service_id);
  }

  //get all counters assigned to a service
  async getCountersAssignedToService(service_id) {
    return this.dao.getCountersAssignedToService(service_id);
  }

  // get all services
  async getAllServices() {
    return this.dao.getAllServices();
  }

  // Additional methods like updateService, deleteService, getAllServices can be added similarly
}

export default ServiceController;
