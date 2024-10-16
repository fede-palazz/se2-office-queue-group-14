class Service {
  /**
   * Constructor for the Service class
   * @param {number} service_id - The id of the service
   * @param {string} service_name - The name of the service
   * @param {number} avg_service_time - The average time a service takes
   */
  constructor(
    service_id,
    service_name,
    avg_service_time,
    description,
    daily_index
  ) {
    this.service_id = service_id;
    this.service_name = service_name;
    this.avg_service_time = avg_service_time;
    this.description = description;
    this.daily_index = daily_index;
  }
}

export { Service };
