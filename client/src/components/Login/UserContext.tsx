import React from "react";

const UserContext = React.createContext<User | undefined>(undefined);

class User {
  username: string;
  name: string;
  email: string;
  role: string;

  constructor(username: string, name: string, email: string, role: string) {
    this.username = username;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}

enum ROLES {
  MANAGER = "Manager",
  OFFICER = "Officer",
  ADMIN = "Admin",
}

export { UserContext, User, ROLES };
