import UserDAO from "../daos/userDAO.js";

/**
 * Represents a controller for managing users.
 * All methods of this class must interact with the corresponding DAO class to retrieve or store data.
 */
class UserController {
  constructor() {
    this.dao = new UserDAO();
  }

  /**
   * Creates a new user.
   * @param username - The username of the new user. It must not be null and it must not be already taken.
   * @param name - The name of the new user. It must not be null.
   * @param email - The email of the new user. It must not be null.
   * @param password - The password of the new user. It must not be null.
   * @param role - The role of the new user. It must not be null and it can only be one of the three allowed types ("Manager", "Customer", "Admin")
   * @returns A Promise that resolves to true if the user has been created.
   */
  async createUser(username, name, email, password, role) {
    return this.dao.createUser(username, name, email, role, password);
  }
}

export default UserController;
