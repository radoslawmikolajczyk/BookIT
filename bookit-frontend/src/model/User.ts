import { Group } from "./Group"
import { Reservation } from "./Reservation"

export class User {
    firstName: string
    lastName: string
    email: string
    password: string
    group: Group
    reservations: [Reservation]
    
    create(firstName: string, lastName: string, email: string, password: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
    }
}