
import ServiceDAO from "../daos/serviceDAO";
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
  
  // Additional methods like updateService, deleteService, getAllServices can be added similarly
}

export default ServiceController;
