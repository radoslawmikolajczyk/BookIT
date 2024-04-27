import { Group } from "./Group"
import { Reservation } from "./Reservation"

export class User {
    firstName: string
    lastName: string
    email: string
    password: string
    
    create(firstName: string, lastName: string, email: string, password: string) : User {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        return this
    }
}