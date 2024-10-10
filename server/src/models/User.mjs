/**
 * Represents a user in the system.
 */
class User {
  /**
   * Creates a new instance of the User class.
   * @param user_id - The user id of the user. This is unique for each user.
   * @param name - The name of the user.
   * @param email - The name of the user.
   * @param role - The role of the user.
   */

  constructor(user_id, name, email, role) {
    this.user_id = user_id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}

/**
 * Represents the role of a user.
 * The values present are the only valid values for the role of a user.
 */
const Role = Object.freeze({
  MANAGER: "Manager",
  ADMIN: "Admin",
});

export { User, Role };
