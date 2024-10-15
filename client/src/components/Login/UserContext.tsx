import React from "react"

const UserContext = React.createContext<User | undefined>(undefined)

class User {
    username: string
    name: string
    email: string
    role: string

    constructor(username: string, name: string, email: string, role: string) {
        this.username = username
        this.name = name
        this.email = email
        this.role = role
    }
}


enum ROLES {
    MANAGER = "manager",
    CUSTOMER = "customer",
    ADMIN = "admin"
}

export { UserContext, User, ROLES }